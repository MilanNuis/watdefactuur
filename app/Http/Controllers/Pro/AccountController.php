<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pro\Account\UpdateEmailRequest;
use App\Http\Requests\Pro\Account\UpdatePasswordRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Mollie\Laravel\Facades\Mollie;

class AccountController extends Controller
{
    /**
     * Display the account page.
     */
    public function index(): Response
    {
        return Inertia::render('Pro/Account/Index', [
            'user' => Auth::user(),
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(UpdatePasswordRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => Hash::make($request->validated('password')),
        ]);

        return back()->with('success', 'Wachtwoord succesvol gewijzigd!');
    }

    /**
     * Update the user's email address.
     */
    public function updateEmail(UpdateEmailRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return back()->with('success', 'Email adres succesvol gewijzigd!');
    }

    /**
     * Cancel the pro subscription.
     */
    public function cancelSubscription(Request $request): RedirectResponse
    {   
        // Cancel subscription with mollie
        Mollie::api()->subscriptions->delete(Auth::user()->mollie_subscription_id);

        $user = $request->user();
        $user->is_pro = false;
        $user->save();

        return back()->with('success', 'Subscription succesvol opgezegd.');
    }
}
