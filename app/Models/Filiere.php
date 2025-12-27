<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'description'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function annonces()
    {
        return $this->hasMany(Annonce::class);
    }
}
