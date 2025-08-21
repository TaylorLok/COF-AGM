<?php

namespace Database\Factories;

use App\Models\Report;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportFactory extends Factory
{
    protected $model = Report::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'filename' => $this->faker->uuid() . '.pdf',
            'original_filename' => $this->faker->word() . '.pdf',
            'file_path' => 'reports/' . $this->faker->uuid() . '.pdf',
            'file_size' => $this->faker->numberBetween(1024, 10485760), // 1KB to 10MB
            'mime_type' => 'application/pdf',
            'description' => $this->faker->paragraph(),
        ];
    }
}
