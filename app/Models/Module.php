<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'description'];

    /**
     * Relation : Un module A PLUSIEURS séances.
     */
    public function seances()
    {
        return $this->hasMany(Seance::class);
    }
}