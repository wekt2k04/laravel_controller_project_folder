<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Module;
use App\Models\Seance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Création du Professeur
        User::factory()->create([
            'name' => 'Professeur Principal',
            'email' => 'prof@ensa.ma',
            'password' => Hash::make('password'),
            'role' => 'prof',
        ]);

        // 2. Création de 50 Étudiants
        $students = User::factory(50)->create([
            'role' => 'etudiant'
        ]);

        // 3. Création MANUELLE des Modules (Plus besoin de Factory)
        $module1 = Module::create([
            'titre' => 'Développement Web Dynamique',
            'description' => 'Apprentissage de Laravel et React'
        ]);
        
        $module2 = Module::create([
            'titre' => 'Base de Données Avancées',
            'description' => 'Administration Oracle et MySQL'
        ]);

        // 4. Création MANUELLE des Séances liées aux modules
        Seance::create([
            'titre' => 'Introduction à Laravel',
            'date_debut' => now()->addDays(1), // Demain
            'module_id' => $module1->id
        ]);

        Seance::create([
            'titre' => 'Architecture MVC',
            'date_debut' => now()->addDays(3), // Dans 3 jours
            'module_id' => $module1->id
        ]);

        Seance::create([
            'titre' => 'Optimisation SQL',
            'date_debut' => now()->addDays(2),
            'module_id' => $module2->id
        ]);
    }
}