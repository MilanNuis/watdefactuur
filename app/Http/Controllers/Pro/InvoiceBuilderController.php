<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Mail\InvoiceEmail;
use Illuminate\Support\Facades\Mail;

class InvoiceBuilderController extends Controller
{
    public function index()
    {
        $settings = Auth::user()->settings;
        $products = Auth::user()->products;
        $customers = Auth::user()->customers;

        $currentYear = date('Y');
        $lastInvoice = Auth::user()->invoices()
            ->where('invoice_number', 'like', $currentYear . '-%')
            ->orderBy('invoice_number', 'desc')
            ->first();

        if ($lastInvoice) {
            $parts = explode('-', $lastInvoice->invoice_number);
            $sequence = intval(end($parts)) + 1;
            $nextInvoiceNumber = $currentYear . '-' . str_pad($sequence, 3, '0', STR_PAD_LEFT);
        } else {
            $nextInvoiceNumber = $currentYear . '-001';
        }

        return Inertia::render('Pro/InvoiceBuilder/Index', compact('settings', 'products', 'customers', 'nextInvoiceNumber'));
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

        $client = $data['client'] ?? [];
        $clientName = $client['name'] ?? '';
        $clientAddress = $client['address'] ?? '';
        
        $nameParts = explode(' ', $clientName, 2);
        $clientFirstName = $nameParts[0] ?? '';
        $clientLastName = $nameParts[1] ?? '';
        
        if (preg_match('/^(.+?)\s+(\d+[\w\-\/]*)$/', trim($clientAddress), $matches)) {
            $clientStreet = trim($matches[1]);
            $clientHouseNumber = trim($matches[2]);
        } else {
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

    public function email(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $data = $request->all();

        $products = collect($data['products'] ?? []);
        $subtotal = $products->sum(fn($product) => ($product['quantity'] ?? 0) * ($product['unitPrice'] ?? 0));
        $btwTotal = $products->sum(
            fn($product) => ($product['quantity'] ?? 0) * ($product['unitPrice'] ?? 0) * (($product['btw'] ?? 0) / 100)
        );
        $total = $subtotal + $btwTotal;

        $invoiceNumber = $data['invoiceNumber'] ?? 'nieuw';

        $client = $data['client'] ?? [];
        $clientName = $client['name'] ?? '';
        $clientAddress = $client['address'] ?? '';
        
        $nameParts = explode(' ', $clientName, 2);
        $clientFirstName = $nameParts[0] ?? '';
        $clientLastName = $nameParts[1] ?? '';
        
        if (preg_match('/^(.+?)\s+(\d+[\w\-\/]*)$/', trim($clientAddress), $matches)) {
            $clientStreet = trim($matches[1]);
            $clientHouseNumber = trim($matches[2]);
        } else {
            $clientStreet = trim($clientAddress);
            $clientHouseNumber = '';
        }

        Auth::user()->invoices()->create([
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

        Mail::to($request->email)->send(new InvoiceEmail($data, $pdf->output(), $invoiceNumber));

        return response()->json(['message' => 'E-mail succesvol verzonden.']);
    }
}
