<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
class InvoiceBuilderController extends Controller
{
    public function index()
    {
        $settings = Auth::user()->settings;
        $products = Auth::user()->products;
        $customers = Auth::user()->customers;

        return Inertia::render('Pro/InvoiceBuilder/Index', compact('settings', 'products', 'customers'));
    }

    public function download(Request $request)
    {
        $data = $request->all();

        $products = collect($data['products'] ?? []);
        $subtotal = $products->sum(fn($product) => ($product['quantity'] ?? 0) * ($product['unitPrice'] ?? 0));
        $btwTotal = $products->sum(
            fn($product) => ($product['quantity'] ?? 0) * ($product['unitPrice'] ?? 0) * (($product['btw'] ?? 0) / 100)
        );
        $total = $subtotal + $btwTotal;

        $filename = 'factuur-' . ($data['invoiceNumber'] ?? 'nieuw') . '.pdf';

        // Transform client data from frontend structure to database structure
        $client = $data['client'] ?? [];
        $clientName = $client['name'] ?? '';
        $clientAddress = $client['address'] ?? '';
        
        // Split name into first and last name
        $nameParts = explode(' ', $clientName, 2);
        $clientFirstName = $nameParts[0] ?? '';
        $clientLastName = $nameParts[1] ?? '';
        
        // Split address into street and house number
        // Try to extract house number from end of address string (e.g., "Julianalaan 6" or "Straatnaam 123A")
        if (preg_match('/^(.+?)\s+(\d+[\w\-\/]*)$/', trim($clientAddress), $matches)) {
            $clientStreet = trim($matches[1]);
            $clientHouseNumber = trim($matches[2]);
        } else {
            // If no house number found, use entire address as street
            $clientStreet = trim($clientAddress);
            $clientHouseNumber = '';
        }

        $invoice = Auth::user()->invoices()->create([
            'invoice_number' => $data['invoiceNumber'] ?? '',
            'invoice_date' => $data['invoiceDate'] ?? '',
            'due_date' => $data['dueDate'] ?? '',
            'client_first_name' => $clientFirstName,
            'client_last_name' => $clientLastName,
            'client_email' => $client['email'] ?? '',
            'client_phone' => $client['phone'] ?? '',
            'client_postalcode' => $client['postalCode'] ?? '',
            'client_house_number' => $clientHouseNumber,
            'client_city' => $client['city'] ?? '',
            'client_street' => $clientStreet,
            'client_country' => $client['country'] ?? 'Nederland',
            'products' => $products,
            'subtotal' => $subtotal,
            'btw_total' => $btwTotal,
            'total' => $total,
            'status' => 'verzonden',
        ]);

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
