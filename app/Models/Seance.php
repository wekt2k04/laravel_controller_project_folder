<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Seance extends Model
{
    use HasFactory;

    // Autorise le remplissage automatique (Mass Assignment)
    protected $guarded = [];

    // Relation : Une séance appartient à un Module
    public function module() {
        return $this->belongsTo(Module::class);
    }

    // Relation : Une séance a plusieurs Présences
    public function presences() {
        return $this->hasMany(Presence::class);
    }
}