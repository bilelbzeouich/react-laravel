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
        Schema::create('commandes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->unsignedBigInteger('pv_id');
            $table->string('product_title')->nullable();
            $table->string('quantity')->nullable();
            $table->string('price')->nullable();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('emplacementpv_id');
            $table->string('payment_status')->nullable();
            $table->string('delivery_status')->nullable();
            $table->foreign('pv_id')->references('id')->on('pvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('product_id')->references('id')->on('produits')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('emplacementpv_id')->references('id')->on('emplacementpvs')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
