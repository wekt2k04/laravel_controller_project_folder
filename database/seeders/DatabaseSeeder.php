<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Créer le Professeur (Admin de test)
        \App\Models\User::factory()->create([
            'name' => 'Professeur Principal',
            'email' => 'prof@ensa.ma',
            'password' => bcrypt('password'), // Mot de passe hashé
            'role' => 'prof'
        ]);

        // 2. Créer 50 étudiants aléatoires
        \App\Models\User::factory(50)->create([
            'role' => 'etudiant'
        ]);
    }
}
