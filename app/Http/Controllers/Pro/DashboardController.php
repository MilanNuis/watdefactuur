<?php

namespace App\Http\Controllers\Pro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $recentInvoices = Auth::user()->invoices()->orderBy('created_at', 'desc')->take(5)->get();
        $recentCustomers = Auth::user()->customers()->orderBy('created_at', 'desc')->take(5)->get();
        $customerCount = Auth::user()->customers()->count();
        $productCount = Auth::user()->products()->count();
        $invoiceCount = Auth::user()->invoices()->count();
        $totalRevenue = Auth::user()->invoices()
            ->whereYear('created_at', date('Y'))
            ->whereMonth('created_at', date('m'))
            ->sum('total');
        return Inertia::render('Dashboard/Index', compact('recentInvoices', 'recentCustomers', 'customerCount', 'productCount', 'invoiceCount', 'totalRevenue'));
    }
}
