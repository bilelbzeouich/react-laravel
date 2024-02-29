<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commande extends Model
{
    use HasFactory;
    public function cartepv()
    {
        return $this->belongsTo(cartepv::class);
    }
    public function stockpv()
    {
        return $this->belongsTo(stockpv::class);
    }
    public function produits()
    {
        return $this->belongsTo(produits::class);
    }
}
