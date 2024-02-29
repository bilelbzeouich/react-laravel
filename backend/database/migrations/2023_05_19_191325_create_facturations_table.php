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
        Schema::create('facturations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('emplacementpv_id');
            $table->unsignedBigInteger('clientpv_id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('stockpvs_id');
            $table->unsignedBigInteger('pv_id');
            $table->Integer('qte');
            $table->date('date_livraison')->nullable();
            $table->foreign('pv_id')->references('id')->on('pvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('clientpv_id')->references('id')->on('clientpvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('emplacementpv_id')->references('id')->on('emplacementpvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('stockpvs_id')->references('id')->on('stockpvs')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturations');
    }
};
