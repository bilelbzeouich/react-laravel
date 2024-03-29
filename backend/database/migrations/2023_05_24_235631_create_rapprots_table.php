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
        Schema::create('rapprots', function (Blueprint $table) {
            $table->id();
            $table->float('prix');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('produits')->onDelete('cascade')->onUpdate('cascade');
            $table->date('date_livraison')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rapprots');
    }
};
