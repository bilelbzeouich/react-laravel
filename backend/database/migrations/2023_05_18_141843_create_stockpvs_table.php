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
        Schema::create('stockpvs', function (Blueprint $table) {
            $table->id();
            $table->integer('qte');
            $table->unsignedBigInteger('pv_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('emplacementpv_id');
            $table->string('category');
            $table->foreign('emplacementpv_id')->references('id')->on('emplacementpvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('pv_id')->references('id')->on('pvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('product_id')->references('id')->on('produits')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stockpvs');
    }
};
