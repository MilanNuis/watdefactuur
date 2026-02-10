<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userCount = User::count();
        $invoiceCount = Invoice::count();
        $prouserCount = User::where('is_pro', true)->count();

        // Pro users per dag (afgelopen 7 dagen) - nieuwe pro users = users die pro zijn geworden
        $proUsersPerDay = $this->getProUsersPerDay();
        $invoicesPerDay = $this->getInvoicesPerDay();

        return Inertia::render('Admin/Dashboard/Index', compact(
            'userCount',
            'invoiceCount',
            'prouserCount',
            'proUsersPerDay',
            'invoicesPerDay'
        ));
    }

    private function getProUsersPerDay(): array
    {
        $days = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->startOfDay();
            $count = User::where('is_pro', true)
                ->whereDate('created_at', $date)
                ->count();
            $days->push([
                'date' => $date->format('Y-m-d'),
                'label' => $date->translatedFormat('D d M'),
                'proUsers' => $count,
            ]);
        }
        return $days->toArray();
    }

    private function getInvoicesPerDay(): array
    {
        $days = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i)->startOfDay();
            $count = Invoice::whereDate('created_at', $date)->count();
            $days->push([
                'date' => $date->format('Y-m-d'),
                'label' => $date->translatedFormat('D d M'),
                'invoices' => $count,
            ]);
        }
        return $days->toArray();
    }
}
