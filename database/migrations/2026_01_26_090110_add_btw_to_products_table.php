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
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('btw', 10, 2)->default(0)->after('price');
            $table->decimal('price_without_btw', 10, 2)->default(0)->after('price');
            $table->decimal('price_with_btw', 10, 2)->default(0)->after('price');
            $table->dropColumn('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            //
            $table->dropColumn('btw');
            $table->dropColumn('price_without_btw');
            $table->dropColumn('price_with_btw');
            $table->decimal('price', 10, 2)->default(0)->after('price');
        });
    }
};
