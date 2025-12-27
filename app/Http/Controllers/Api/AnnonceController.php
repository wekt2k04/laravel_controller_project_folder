<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Annonce;
use Illuminate\Http\Request;

class AnnonceController extends Controller
{
    public function index(Request $request)
    {
        $query = Annonce::query();

        // Si un étudiant est connecté et a une filière, on peut filtrer
        // Pour l'instant, on renvoie tout ou on filtre par filiere_id si passé en paramètre
        if ($request->has('filiere_id')) {
            $query->where('filiere_id', $request->filiere_id)
                  ->orWhereNull('filiere_id'); // Toujours inclure les annonces globales
        }

        return response()->json($query->latest()->get());
    }
}
