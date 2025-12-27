<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SeanceController;
use App\Http\Controllers\Api\PresenceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StatistiqueController;

// 1. Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// 2. Gestion des Séances (Liste, Détails)
Route::apiResource('seances', SeanceController::class);

// 2b. Gestion des Filières et Annonces (Nouveau)
Route::get('/filieres', [App\Http\Controllers\Api\FiliereController::class, 'index']);
Route::get('/filieres/{id}', [App\Http\Controllers\Api\FiliereController::class, 'show']);
Route::get('/annonces', [App\Http\Controllers\Api\AnnonceController::class, 'index']);

// 2c. Statistiques
Route::get('/statistiques', [StatistiqueController::class, 'index']);

// 3. Enregistrement de l'appel
Route::post('/appel/save', [PresenceController::class, 'store']);

// 4. Route utilisateur par défaut
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});