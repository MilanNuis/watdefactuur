<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Mollie\Api\Http\Data\Money;
use Mollie\Api\Http\Requests\CreateSubscriptionRequest;
use Mollie\Laravel\Facades\Mollie;

class MollieController extends Controller
{
    public function handleWebhook(Request $request)
    {
        try {
            $paymentId = $request->input('id');

            if (!$paymentId) {
                return response('No payment ID', 200);
            }

            $payment = Mollie::api()->payments->get($paymentId);

            if ($payment->isPaid()) {
                $userId = $payment->metadata?->user_id ?? null;
                $subscriptionId = $payment->subscriptionId ?? null;

                // Eerste betaling: maak subscription aan en sla subscription ID op
                if ($userId) {
                    $user = User::find($userId);
                    if ($user) {
                        $user->mollie_customer_id = $payment->customerId;
                        $user->is_pro = true;

                        if (!$user->mollie_subscription_id) {
                            $subscription = Mollie::api()->send(
                                new CreateSubscriptionRequest(
                                    customerId: $user->mollie_customer_id,
                                    amount: new Money('EUR', '10.00'),
                                    interval: '1 month',
                                    description: 'WatDeFactuur Pro',
                                    webhookUrl: route('mollie.webhook'),
                                    metadata: ['user_id' => $user->id]
                                )
                            );
                            $user->mollie_subscription_id = $subscription->id;
                        }
                        $user->save();
                    }
                    return response('Payment processed: user is now pro', 200);
                }

                // Terugkerende subscription betaling: vind user en behoud pro status
                if ($subscriptionId) {
                    $user = User::where('mollie_customer_id', $payment->customerId)
                        ->where('mollie_subscription_id', $subscriptionId)
                        ->first();
                    if ($user) {
                        $user->is_pro = true;
                        $user->save();
                    }
                    return response('Subscription payment processed', 200);
                }
            }

            return response('Betaling niet voltooid.', 200);
        } catch (\Exception $e) {
            Log::error('Error in webhook', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response('Webhook error', 500);
        }
    }

    public function startCheckout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        try {
            if (!$user->mollie_customer_id) {
                $customer = Mollie::api()->customers->create([
                    'name' => $user->name,
                    'email' => $user->email,
                ]);

                // 3. Save the customer ID to the user
                $user->mollie_customer_id = $customer->id;
                $user->save();
            }

            // 4. Create the payment linked to the customer
            $payment = Mollie::api()->customerPayments->createForId($user->mollie_customer_id, [
                'amount' => [
                    'currency' => 'EUR',
                    'value' => '5.00',
                ],
                'description' => "WatDeFactuur Pro",
                'redirectUrl' => route('home'),
                'webhookUrl' => route('mollie.webhook'),
                'metadata' => ['user_id' => $user->id],
                'sequenceType' => \Mollie\Api\Types\SequenceType::FIRST,
            ]);

            return Inertia::location($payment->getCheckoutUrl());
        } catch (\Exception $e) {
            Log::error('Error starting checkout', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', 'Er is iets misgegaan bij het starten van de betaling. Probeer het later opnieuw.');
        }
    }
}
