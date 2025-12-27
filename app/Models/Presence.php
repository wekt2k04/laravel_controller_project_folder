<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;

    public function seance()
    {
        return $this->belongsTo(Seance::class);
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
