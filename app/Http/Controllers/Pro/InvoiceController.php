<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Auth::user()->invoices()->orderBy('created_at', 'desc')->paginate(25);
        return Inertia::render('Pro/Invoices/Index', compact('invoices'));
    }
}
