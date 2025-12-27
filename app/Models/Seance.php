<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seance extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'date_debut', 'date_fin', 'module_id'];

    public function presences()
    {
        return $this->hasMany(Presence::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
