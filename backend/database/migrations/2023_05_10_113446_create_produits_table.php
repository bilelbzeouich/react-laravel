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
        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('code_produit')->nullable();
            $table->string('nom')->nullable();
            $table->string('image')->nullable();
            $table->string('description')->nullable();
            $table->string('qte')->nullable();
            $table->float('prix')->nullable();
            $table->date('date_expiration')->nullable();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('emplacement_id');
            $table->unsignedBigInteger('fornissuer_id');
            $table->foreign('fornissuer_id')->references('id')->on('fornissuers')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('emplacement_id')->references('id')->on('emplacements')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
