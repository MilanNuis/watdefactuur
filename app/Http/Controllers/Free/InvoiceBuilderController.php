<?php

namespace App\Http\Controllers\Free;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceBuilderController extends Controller
{
    public function index()
    {
        return Inertia::render('InvoiceBuilder');
    }

    public function download(Request $request)
    {
        $data = $request->all();
        $products = collect($data['products'] ?? []);
        $subtotal = $products->sum(fn ($product) => ($product['quantity'] ?? 0) * ($product['unitPrice'] ?? 0));
        $btwTotal = $products->sum(
            fn ($product) => ($product['quantity'] ?? 0) * ($product['unitPrice'] ?? 0) * (($product['btw'] ?? 0) / 100)
        );
        $total = $subtotal + $btwTotal;

        $filename = 'factuur-' . ($data['invoiceNumber'] ?? 'nieuw') . '.pdf';

        $pdf = Pdf::loadView('invoice-builder.pdf', [
            'invoice' => $data,
            'products' => $products,
            'subtotal' => $subtotal,
            'btwTotal' => $btwTotal,
            'total' => $total,
        ]);

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
