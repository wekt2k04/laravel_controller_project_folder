<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;

    // Autoriser l'écriture en masse sur ces 3 colonnes
    protected $fillable = ['seance_id', 'student_id', 'est_present'];

    // On s'assure que 'est_present' est toujours converti en booléen (vrai/faux)
    protected $casts = [
        'est_present' => 'boolean',
    ];

    /**
     * Relation : Une présence appartient à une Séance.
     */
    public function seance()
    {
        return $this->belongsTo(Seance::class);
    }

    /**
     * Relation : Une présence appartient à un Étudiant (User).
     */
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}