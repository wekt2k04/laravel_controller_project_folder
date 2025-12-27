<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'contenu', 'filiere_id'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}
