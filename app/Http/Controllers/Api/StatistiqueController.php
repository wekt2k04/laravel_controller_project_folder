<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use App\Models\Presence;
use App\Models\Seance;

class StatistiqueController extends Controller
{
    public function index()
    {
        $filieres = Filiere::with(['modules'])->get();
        
        $stats = $filieres->map(function ($filiere) {
            // Récupérer les IDs des modules de la filière
            $moduleIds = $filiere->modules->pluck('id');
            
            // Récupérer les IDs des séances de ces modules
            $seanceIds = Seance::whereIn('module_id', $moduleIds)->pluck('id');
            
            // Récupérer les présences pour ces séances
            $presences = Presence::whereIn('seance_id', $seanceIds)->get();
            
            $totalAbsences = $presences->where('est_present', 0)->count();
            
            // Simulation des justifiées (environ 30% des absences)
            $justifiees = round($totalAbsences * 0.3);
            
            // Avancement : (Séances passées / Séances totales prévues)
            // On suppose 12 séances par module
            $totalModules = $filiere->modules->count();
            $totalSeancesPrevues = $totalModules * 12; 
            
            $seancesPassees = Seance::whereIn('module_id', $moduleIds)
                                ->where('date_fin', '<', now())
                                ->count();
            
            $avancement = $totalSeancesPrevues > 0 ? round(($seancesPassees / $totalSeancesPrevues) * 100) : 0;

            return [
                'nom' => $filiere->nom,
                'absences' => $totalAbsences,
                'justifiees' => $justifiees,
                'avancement' => $avancement
            ];
        });

        return response()->json($stats);
    }
}
