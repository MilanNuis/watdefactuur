<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Pro\AccountController;
use App\Http\Controllers\Free\InvoiceBuilderController;
use App\Http\Controllers\MollieController;
use App\Http\Controllers\Pro\CustomerController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Pro\DashboardController;
use App\Http\Controllers\Pro\InvoiceBuilderController as ProInvoiceBuilderController;
use App\Http\Controllers\Pro\InvoiceController;
use App\Http\Controllers\Pro\ProductController;
use App\Http\Controllers\Pro\SettingsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaxController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::prefix('mollie')->name('mollie.')->controller(MollieController::class)->group(function () {
    Route::post('/webhook', 'handleWebhook')->name('webhook')->withoutMiddleware(['auth', 'web']);
    Route::post('/start-checkout', 'startCheckout')->name('start-checkout')->middleware('auth');
});

Route::prefix('invoice-builder')->name('invoice-builder.')->controller(InvoiceBuilderController::class)->group(function () {
    Route::get(null, 'index')->name('index');
    Route::post('/download', 'download')->name('download');
});

Route::prefix('pro')->name('pro.')->middleware(['auth', 'checkIfUserIsPro'])->group(function () {

    Route::prefix('invoice-builder')->name('invoice-builder.')->controller(ProInvoiceBuilderController::class)->group(function () {
        Route::get(null, 'index')->name('index');
        Route::post('/download', 'download')->name('download');
    });

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
            Route::patch('/update-status/{invoice}', 'updateStatus')->name('update-status');
        });

        Route::prefix('settings')->name('settings.')->controller(SettingsController::class)->group(function () {
            Route::get(null, 'index')->name('index');
            Route::patch('/update', 'update')->name('update');
        });

        Route::prefix('account')->name('account.')->controller(AccountController::class)->group(function () {
            Route::get(null, 'index')->name('index');
            Route::put('/password', 'updatePassword')->name('password.update');
            Route::patch('/email', 'updateEmail')->name('email.update');
            Route::post('/subscription/cancel', 'cancelSubscription')->name('subscription.cancel');
        });

        Route::prefix('belastingen')->name('taxes.')->controller(TaxController::class)->group(function () {
            Route::get(null, 'index')->name('index');
        });
    });
});
Route::prefix('admin')->name('admin.')->middleware(['auth', 'checkIfIsAdmin'])->group(function () {
    Route::prefix('dashboard')->name('dashboard.')->controller(AdminDashboardController::class)->group(function () {
        Route::get(null, 'index')->name('index');
    });
    Route::prefix('gebruikers')->name('users.')->controller(UserController::class)->group(function () {
        Route::get(null, 'index')->name('index');
        Route::post(null, 'store')->name('store');
        Route::patch('{user}', 'update')->name('update');
        Route::patch('{user}/toggle-pro', 'togglePro')->name('toggle-pro');
        Route::delete('{user}', 'destroy')->name('destroy');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
