<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stockpv extends Model
{
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(category::class);
    }
    public function emplacementpv()
    {
        return $this->belongsTo(emplacementpv::class);
    }
    public function produits()
    {
        return $this->belongsTo(produits::class);
    }
}
