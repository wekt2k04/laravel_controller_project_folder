<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Presence;

class PresenceFactory extends Factory
{
    protected $model = Presence::class;

    public function definition(): array
    {
        return [
            'est_present' => $this->faker->boolean(),
            // seance_id et student_id seront assignés dans le seeder
        ];
    }
}
