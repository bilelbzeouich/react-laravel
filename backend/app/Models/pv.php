<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class pv extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    final public function getUserByEmailOrPhone(array $input): Builder|Model|null
    {
        return  self::query()->where('email', $input['email'])->orWhere('phone', $input['email'])->first();
    }
}
