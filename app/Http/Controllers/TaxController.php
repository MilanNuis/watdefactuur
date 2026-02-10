<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaxController extends Controller
{
    public function index()
    {
        $invoices = Auth::user()->invoices()->get();

        return Inertia::render('Pro/Taxes/Index', [
            'invoices' => $invoices,
        ]);
    }
}
