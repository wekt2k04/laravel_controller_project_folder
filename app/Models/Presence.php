<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Presence extends Model
{
    use HasFactory;

    // Indispensable pour le updateOrCreate du Sprint 3
    protected $guarded = []; 

    public function user() {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function seance() {
        return $this->belongsTo(Seance::class);
    }
}