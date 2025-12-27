<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Module;

class ModuleFactory extends Factory
{
    protected $model = Module::class;

    public function definition(): array
    {
        return [
            'titre' => $this->faker->words(2, true),  // titre
            'description' => $this->faker->sentence(),
        ];
    }
}
