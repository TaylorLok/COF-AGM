<?php

namespace Database\Factories;

use App\Models\ReportDownload;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReportDownloadFactory extends Factory
{
    protected $model = ReportDownload::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'report_id' => Report::factory(),
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => $this->faker->userAgent(),
        ];
    }
}
