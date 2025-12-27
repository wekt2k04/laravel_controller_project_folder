<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Module;
use App\Models\Seance;
use App\Models\Presence;
use App\Models\Filiere;
use App\Models\Annonce;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 0️⃣ Créer les Filières
        $filiereGinf = Filiere::create(['nom' => 'G.INF', 'description' => 'Génie Informatique']);
        $filiereGtr = Filiere::create(['nom' => 'GTR', 'description' => 'Génie Télécoms & Réseaux']);
        $filiereIndus = Filiere::create(['nom' => 'G.INDUS', 'description' => 'Génie Industriel']);

        // 1️⃣ Créer l'admin
        User::factory()->create([
            'name' => 'Administrateur',
            'email' => 'admin@ensa.ma',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // 2️⃣ Créer le prof
        User::factory()->create([
            'name' => 'Professeur Principal',
            'email' => 'prof@ensa.ma',
            'password' => bcrypt('password'),
            'role' => 'prof',
        ]);

        // 2.5️⃣ Créer un étudiant de test spécifique
        User::factory()->create([
            'name' => 'Etudiant Test',
            'email' => 'etudiant@ensa.ma',
            'password' => bcrypt('password'),
            'role' => 'etudiant',
            'filiere_id' => $filiereGinf->id,
        ]);

        // 3️⃣ Créer 50 étudiants répartis dans les filières
        $studentsGinf = User::factory(20)->create(['role' => 'etudiant', 'filiere_id' => $filiereGinf->id]);
        $studentsGtr = User::factory(15)->create(['role' => 'etudiant', 'filiere_id' => $filiereGtr->id]);
        $studentsIndus = User::factory(15)->create(['role' => 'etudiant', 'filiere_id' => $filiereIndus->id]);
        
        $allStudents = $studentsGinf->merge($studentsGtr)->merge($studentsIndus);

        // 4️⃣ Créer des modules liés aux filières
        $moduleAlgo = Module::create(['titre' => 'Algorithmique', 'description' => 'Bases de l\'algo', 'filiere_id' => $filiereGinf->id]);
        $moduleWeb = Module::create(['titre' => 'Dev Web', 'description' => 'React & Laravel', 'filiere_id' => $filiereGinf->id]);
        $moduleReseau = Module::create(['titre' => 'Réseaux IP', 'description' => 'TCP/IP', 'filiere_id' => $filiereGtr->id]);
        $moduleElec = Module::create(['titre' => 'Électronique', 'description' => 'Circuits', 'filiere_id' => $filiereIndus->id]);

        $modules = [$moduleAlgo, $moduleWeb, $moduleReseau, $moduleElec];

        // 5️⃣ Créer des séances
        foreach ($modules as $module) {
            // Créer 3 séances pour ce module
            for ($i = 0; $i < 3; $i++) {
                $seance = Seance::create([
                    'titre' => 'Cours ' . ($i + 1) . ' - ' . $module->titre,
                    'date_debut' => now()->addDays($i),
                    'date_fin' => now()->addDays($i)->addHours(2),
                    'module_id' => $module->id,
                ]);

                // 6️⃣ Créer les présences (seulement pour les étudiants de la filière du module)
                $targetStudents = User::where('filiere_id', $module->filiere_id)->get();
                
                foreach ($targetStudents as $student) {
                    Presence::create([
                        'seance_id' => $seance->id,
                        'student_id' => $student->id,
                        'est_present' => rand(0, 1) == 1,
                    ]);
                }
            }
        }

        // 7️⃣ Créer des Annonces
        Annonce::create([
            'titre' => 'Vacances de l\'AID 🎄',
            'contenu' => 'Les vacances débutent le 24 décembre.',
            'filiere_id' => null // Global
        ]);

        Annonce::create([
            'titre' => 'Rattrapage Algorithmique',
            'contenu' => 'Le cours de lundi est reporté à mardi.',
            'filiere_id' => $filiereGinf->id // Ciblé G.INF
        ]);
    }
}
