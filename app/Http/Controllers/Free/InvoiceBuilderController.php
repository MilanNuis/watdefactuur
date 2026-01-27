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

        // Inertia expects a file download to be returned as a StreamedResponse.
        // We want to force-download the PDF via a streamed response so the browser handles it as a file, not a raw string or new tab.
        return response()->streamDownload(function () use ($data, $products, $subtotal, $btwTotal, $total) {
            echo Pdf::loadView('invoice-builder.pdf', [
                'invoice' => $data,
                'products' => $products,
                'subtotal' => $subtotal,
                'btwTotal' => $btwTotal,
                'total' => $total,
            ])->output();
        }, $filename, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
