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
        $payment = Mollie::api()->payments->get($request->id);

        if ($payment->isPaid()) {
            Log::info('Payment is paid', ['payment' => $payment]);
        }

        return response()->json(['message' => 'Webhook received']);
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
