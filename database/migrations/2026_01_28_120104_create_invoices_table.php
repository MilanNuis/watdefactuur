<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('invoice_number');
            $table->date('invoice_date');
            $table->date('due_date');
            $table->string('client_first_name');
            $table->string('client_last_name');
            $table->string('client_email');
            $table->string('client_phone');
            $table->string('client_postalcode');
            $table->string('client_house_number');
            $table->string('client_city');
            $table->string('client_street');
            $table->string('client_country');
            $table->json('products');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('btw_total', 10, 2);
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
