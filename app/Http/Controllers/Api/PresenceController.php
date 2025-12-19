<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Presence;
use App\Models\User;
use Illuminate\Http\Request;

class PresenceController extends Controller
{
    /**
     * @group GROUPE 3 (Logique)
     * ENREGISTRER L'APPEL
     * URL : POST /api/appel/save
     * Input : { "seance_id": 1, "presences": [5, 12, 45] } (IDs des élèves présents)
     */
    public function store(Request $request)
    {
        // 1. Validation des données reçues
        $request->validate([
            'seance_id' => 'required|exists:seances,id',
            'presences' => 'array', // Doit être une liste
        ]);

        $seanceId = $request->seance_id;
        // Si le tableau est vide (personne n'est là), on prend un tableau vide []
        $presentIds = $request->presences ?? [];

        // 2. Récupérer tous les étudiants
        $students = User::where('role', 'etudiant')->get();
        $countPresent = 0;

        // 3. Boucle intelligente : On traite chaque étudiant
        foreach ($students as $student) {
            // Est-il dans la liste des cochés ?
            $isHere = in_array($student->id, $presentIds);

            if ($isHere) {
                $countPresent++;
            }

            // 4. UpdateOrCreate : Met à jour si existe, Crée si n'existe pas
            Presence::updateOrCreate(
                // Critères de recherche (Qui ? Quelle séance ?)
                ['seance_id' => $seanceId, 'student_id' => $student->id],
                // Valeur à mettre à jour
                ['est_present' => $isHere]
            );
        }

        // 5. Réponse de succès
        return response()->json([
            'message' => 'Appel enregistré avec succès !',
            'statistiques' => [
                'total_etudiants' => $students->count(),
                'presents' => $countPresent,
                'absents' => $students->count() - $countPresent
            ]
        ], 200);
    }
}