<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
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

    public function updateStatus(Request $request, Invoice $invoice)
    {
        $request->validate([
            'status' => 'required|string|in:openstaand,betaald,overtijd',
        ]);

        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        $invoice->update([
            'status' => $request->status,
        ]);

        return back()->with('success', 'Factuur status succesvol bijgewerkt!');
    }
}
