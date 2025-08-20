<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Betram',
            'surname' => 'Evert',
            'email' => 'admin@cof.co.za',
            'password' => Hash::make('XerAever@1!'),
            'is_admin' => true,
        ]);

        // Create test member
        User::create([
            'name' => 'Taylor',
            'surname' => 'Lokombe',
            'email' => 'taylor@cof.co.za',
            'password' => Hash::make('password$%'),
            'is_admin' => false,
        ]);
    }
}
