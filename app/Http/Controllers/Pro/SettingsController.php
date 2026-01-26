<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pro\Settings\StoreValidation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Auth::user()->settings;
        return Inertia::render('Pro/Settings/Index', compact('settings'));
    }

    public function update(StoreValidation $request)
    {
        $request->user()->settings()->updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->validated()
        );

        return redirect()->route('pro.dashboard.settings.index')->with('success', "Instellingen succesvol bijgewerkt!");
    }

}
