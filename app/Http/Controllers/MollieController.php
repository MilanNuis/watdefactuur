<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Mollie\Laravel\Facades\Mollie;

class MollieController extends Controller
{
    public function webhook(Request $request)
    {
        if (!$request->has('id')) {
            // Mollie test webhook of foute call
            return response()->json(['status' => 'no id'], 200);
        }

        try {
            $payment = Mollie::api()->payments->get($request->id);
        } catch (\Exception $e) {
            Log::error('Mollie webhook error', [
                'error' => $e->getMessage(),
                'payload' => $request->all(),
            ]);

            // Altijd 200 teruggeven aan Mollie
            return response()->json(['status' => 'error handled'], 200);
        }

        if ($payment->isPaid()) {
            Log::info('Payment is paid', [
                'id' => $payment->id,
                'metadata' => $payment->metadata,
            ]);

            // hier straks: user upgraden naar pro, factuur maken, etc.
        }

        return response()->json(['status' => 'ok'], 200);
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

        return redirect($payment->getCheckoutUrl());
    }
}
