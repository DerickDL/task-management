<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statusOptions = ['TODO', 'INPROGRESS', 'COMPLETED'];
        $randomStatus = Arr::random($statusOptions);

        return [
            'title'  => fake()->text(20),
            'description' => fake()->text(100),
            'status' => $randomStatus
        ];
    }
}
