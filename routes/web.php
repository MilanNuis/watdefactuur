<?php

use App\Http\Controllers\Pro\CustomerController;
use App\Http\Controllers\Pro\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
});

Route::get('/xander',function(){
    return Inertia::render('InvoiceBuilder');
});


Route::prefix('pro')->name('pro.')->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->controller(DashboardController::class)->group(function () {
        Route::get(null, 'index')->name('index');

        Route::prefix('klanten')->name('customers.')->controller(CustomerController::class)->group(function () {
            Route::get(null, 'index')->name('index');
            Route::post('/store', 'store')->name('store');
            Route::patch('/update/{customer}', 'update')->name('update');
        });
    });

});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
