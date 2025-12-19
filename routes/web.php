<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeanceController;
use App\Http\Controllers\PresenceController;


Route::middleware(['auth'])->group(function () {
    
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // "Resource" creates 7 routes at once (List, Create, Save, Edit...)
    Route::resource('seances', SeanceController::class);

    // Route to save attendance (POST because we are sending data)
    Route::post('/appel/save', [PresenceController::class, 'store'])->name('appel.save');
});

// For testing 
Route::get('/', function() {return view('seances.index'); });