<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pro\Customers\StoreValidation;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Auth::user()->customers()->orderBy('created_at', 'desc')->paginate(25);
        return Inertia::render('Pro/Customers/Index', compact('customers'));
    }

    public function store(StoreValidation $request)
    {
        Auth::user()->customers()->create([
            'first_name' => $request->validated('first_name'),
            'last_name' => $request->validated('last_name'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'postalcode' => $request->validated('postalCode'),
            'house_number' => $request->validated('houseNumber'),
            'city' => $request->validated('city'),
            'street' => $request->validated('street'),
            'country' => $request->validated('country'),
        ]);

        return redirect()->route('pro.dashboard.customers.index')->with('success', "Klant succesvol aangemaakt!");
    }

    public function update(StoreValidation $request, Customer $customer)
    {
        $customer->update([
            'first_name' => $request->validated('first_name'),
            'last_name' => $request->validated('last_name'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'postalcode' => $request->validated('postalCode'),
            'house_number' => $request->validated('houseNumber'),
            'city' => $request->validated('city'),
            'street' => $request->validated('street'),
            'country' => $request->validated('country'),
        ]);

        return redirect()->route('pro.dashboard.customers.index')->with('success', 'Klant succesvol bijgewerkt!');
    }
}
