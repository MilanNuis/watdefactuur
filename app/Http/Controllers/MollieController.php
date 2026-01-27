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

            if ($payment->isPaid()) {
                User::find(Auth::user()->id)->update(['is_pro' => true]);
                return redirect()->route('pro.dashboard.index')->with('success', "Je bent nu pro!");
            } else {
                return redirect()->route('pro.dashboard.index')->with('error', "Je betaling is niet voltooid.");
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
            'metadata' => ['user_id' => Auth::id()],
        ]);

        return Inertia::location($payment->getCheckoutUrl());
    }
}
