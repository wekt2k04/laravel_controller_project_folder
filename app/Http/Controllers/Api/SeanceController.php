<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Seance;
use App\Models\User;
use Illuminate\Http\Request;

class SeanceController extends Controller
{
    /**
     * @group GROUPE 3 (Logique)
     * LISTE DES SÉANCES
     * URL : GET /api/seances
     * But : Alimenter le Dashboard du prof.
     */
    public function index()
    {
        // 1. On récupère toutes les séances
        // 'with:module.filiere' permet de récupérer la filière associée au module
        $seances = Seance::with('module.filiere')->orderBy('date_debut', 'desc')->get();

        // 2. On renvoie le tout en JSON
        return response()->json($seances);
    }

    /**
     * @group GROUPE 3 (Logique)
     * DÉTAIL D'UNE SÉANCE (Pour faire l'appel)
     * URL : GET /api/seances/{id}
     * But : Fournir au React le titre du cours ET la liste des élèves à cocher.
     */
    public function show($id)
    {
        // 1. Trouver la séance (ou erreur 404 si elle n'existe pas)
        $seance = Seance::with('module')->findOrFail($id);

        // 2. Récupérer la liste des étudiants (rôle 'etudiant' défini par G1)
        // C'est indispensable pour générer le formulaire de présence (checkboxes).
        $students = User::where('role', 'etudiant')->orderBy('name')->get();

        // 3. On envoie un "Paquet Cadeau" contenant les deux infos
        return response()->json([
            'seance' => $seance,
            'students' => $students
        ]);
    }

    // --- Méthodes inutiles pour l'instant (mais requises par le squelette) ---
    public function store(Request $request) {}
    public function update(Request $request, string $id) {}
    public function destroy(string $id) {}
}