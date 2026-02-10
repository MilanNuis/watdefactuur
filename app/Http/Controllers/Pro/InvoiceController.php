<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Auth::user()->invoices();

        if ($request->has('filter')) {
            switch ($request->filter) {
                case '1 maand':
                    $query->where('invoice_date', '>=', Carbon::now()->subMonth());
                    $filter = '1 maand';
                    break;
                case '3 maanden':
                    $query->where('invoice_date', '>=', Carbon::now()->subMonths(3));
                    $filter = '3 maanden';
                    break;
                case '6 maanden':
                    $query->where('invoice_date', '>=', Carbon::now()->subMonths(6));
                    $filter = '6 maanden';
                    break;
                case '1 jaar':
                    $query->where('invoice_date', '>=', Carbon::now()->subYear());
                    $filter = '1 jaar';
                    break;
                case 'Alles':
                default:
                    $filter = '1 maand';
                    break;
            }
        } else {
            $query->where('invoice_date', '>=', Carbon::now()->subMonth());
            $filter = '1 maand';
        }
        $request->merge(['filter' => $filter]);

        $invoices = $query->orderBy('invoice_date', 'desc')->paginate(25)->withQueryString();

        return Inertia::render('Pro/Invoices/Index', [
            'invoices' => $invoices,
            'filters' => $filter
        ]);
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
