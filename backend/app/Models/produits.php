<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class produits extends Model
{
    use HasFactory;
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function emplacement()
    {
        return $this->belongsTo(emplacement::class);
    }
    public function fornissuer()
    {
        return $this->belongsTo(fornissuer::class);
    }
}
