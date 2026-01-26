<?php

use App\Http\Controllers\MollieController;
use App\Http\Controllers\Pro\CustomerController;
use App\Http\Controllers\Pro\DashboardController;
use App\Http\Controllers\Pro\InvoiceController;
use App\Http\Controllers\Pro\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
});

Route::prefix('mollie')->name('mollie.')->controller(MollieController::class)->group(function () {
    Route::post('/webhook', 'webhook')->name('webhook')->withoutMiddleware('auth');
    Route::post('/start-checkout', 'startCheckout')->name('start-checkout');
});


Route::prefix('pro')->name('pro.')->middleware('auth')->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->controller(DashboardController::class)->group(function () {
        Route::get(null, 'index')->name('index');

        Route::prefix('klanten')->name('customers.')->controller(CustomerController::class)->group(function () {
            Route::get(null, 'index')->name('index');
            Route::post('/store', 'store')->name('store');
            Route::patch('/update/{customer}', 'update')->name('update');
        });

        Route::prefix('producten')->name('products.')->controller(ProductController::class)->group(function () {
            Route::get(null, 'index')->name('index');
            Route::post('/store', 'store')->name('store');
            Route::patch('/update/{product}', 'update')->name('update');
        });

        Route::prefix('facturen')->name('invoices.')->controller(InvoiceController::class)->group(function () {
            Route::get(null, 'index')->name('index');
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
