<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use Illuminate\Http\Request;

class FiliereController extends Controller
{
    public function index()
    {
        // On charge les filières avec leurs modules pour l'affichage "Modules par filière"
        return response()->json(Filiere::with('modules')->get());
    }

    public function show($id)
    {
        return response()->json(Filiere::with(['modules', 'users'])->findOrFail($id));
    }
}
