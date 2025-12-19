<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SeanceController;
use App\Http\Controllers\Api\PresenceController;

// 1. Route de test (Pour vérifier que ça marche)
Route::get('/test', function () {
    return response()->json(['message' => 'L\'API fonctionne parfaitement !']);
});

// 2. Gestion des Séances (Liste, Détails)
Route::apiResource('seances', SeanceController::class);

// 3. Enregistrement de l'appel
Route::post('/appel/save', [PresenceController::class, 'store']);

// 4. Route utilisateur par défaut (on la garde pour plus tard)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});