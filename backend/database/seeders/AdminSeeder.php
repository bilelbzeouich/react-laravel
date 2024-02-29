<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'name' => 'Admin',
            'localisation' => 'local_societe',
            'phone' => 'num_societe',
            'role_id' => 1,
            'adresse' => 'local',
            'rip_bancaire' => 'societe_rip',
            'email' => 'admin@khadra.com',
            'password' => Hash::make('12345678'),




        ];
        User::create($data);
    }
}
