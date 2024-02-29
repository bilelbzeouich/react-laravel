<?php

namespace Database\Seeders;

use App\Models\societe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SocieteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        societe::create([
            'name' => 'elkhadra societe',
            'phone' => 98989671,
            'email' => '5050',
            'logo' => 'image.png',
            'adresse' => 'khadra@gmail.com',
        ]);
    }
}
