<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Seance;

class SeanceFactory extends Factory
{
    protected $model = Seance::class;

    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(2),
            'date_debut' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            // module_id sera assigné dans le seeder
        ];
    }
}
