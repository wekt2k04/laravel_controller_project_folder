<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    use HasFactory;

    // On autorise la modification de ces colonnes
    protected $fillable = ['titre', 'date_debut', 'module_id'];

    /**
     * Relation : Une séance APPARTIENT À un module.
     * C'est cette fonction que le contrôleur appelle avec "with('module')"
     */
    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    /**
     * Relation : Une séance A PLUSIEURS présences.
     */
    public function presences()
    {
        return $this->hasMany(Presence::class);
    }
}