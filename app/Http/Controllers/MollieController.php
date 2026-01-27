<?php

namespace App\Http\Controllers;

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
                Log::warning('Webhook received without payment ID', ['request' => $request->all()]);
                return response('No payment ID', 200);
            }

            Log::info('Webhook received', ['payment_id' => $paymentId, 'request' => $request->all()]);

            $payment = Mollie::api()->payments->get($paymentId);

            if ($payment->isPaid()) {
                Log::info('Payment is paid', ['payment_id' => $paymentId]);
            } else {
                Log::info('Payment not completed', ['payment_id' => $paymentId]);
            }

            return response('Webhook processed', 200);
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
        $payment = Mollie::api()->payments->create([
            'amount' => [
                'currency' => 'EUR',
                'value' => '10.00',
            ],
            'description' => "WatDeFactuur Pro",
            'redirectUrl' => route('pro.dashboard.index'),
            'webhookUrl' => route('mollie.webhook'),
            'metadata' => ['user_id' => Auth::user()->id],
        ]);

        return Inertia::location($payment->getCheckoutUrl());
    }
}
