<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->paginate(25);
        return Inertia::render('Admin/Users/Index', compact('users'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
            'is_pro' => 'boolean',
            'is_admin' => 'boolean',
        ]);


        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_pro' => $request->is_pro ?? false,
            'is_admin' => $request->is_admin ?? false,
        ]);

        return redirect()->back()->with('success', 'Gebruiker succesvol aangemaakt.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'is_pro' => 'boolean',
            'is_admin' => 'boolean',
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'is_pro' => $request->is_pro,
            'is_admin' => $request->is_admin,
        ];

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['nullable', Rules\Password::defaults()],
            ]);
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        return redirect()->back()->with('success', 'Gebruiker succesvol bijgewerkt.');
    }

    public function togglePro(User $user)
    {
        $user->update([
            'is_pro' => !$user->is_pro,
        ]);

        return redirect()->back()->with('success', 'Pro status succesvol gewijzigd.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('success', 'Gebruiker succesvol verwijderd.');
    }
}
