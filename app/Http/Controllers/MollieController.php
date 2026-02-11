<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
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

            $userId = null;
            if (isset($payment->metadata) && isset($payment->metadata->user_id)) {
                $userId = $payment->metadata->user_id;
            }

            if ($payment->isPaid()) {
                if ($userId) {
                    $user = User::find($userId);
                    if ($user) {
                        $user->is_pro = true;
                        $user->mollie_subscription_id = $payment->id;
                        $user->mollie_customer_id = $payment->customerId;
                        $user->save();
                    }
                }
                return response('Payment processed: user is now pro', 200);
            } else {
                return response('Betaling niet voltooid.', 200);
            }
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
                    'value' => '10.00',
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
