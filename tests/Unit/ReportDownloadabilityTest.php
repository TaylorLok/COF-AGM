<?php

namespace Tests\Unit;

use App\Models\Report;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ReportDownloadabilityTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('private');
    }

    public function test_report_is_downloadable_when_file_exists(): void
    {
        $filePath = 'reports/test-file.pdf';
        Storage::disk('private')->put($filePath, 'fake file content');
        
        $report = Report::factory()->create([
            'file_path' => $filePath,
        ]);

        $this->assertTrue(Storage::disk('private')->exists($report->file_path));
        $this->assertTrue($this->isReportDownloadable($report));
    }

    public function test_report_is_not_downloadable_when_file_missing(): void
    {
        $report = Report::factory()->create([
            'file_path' => 'reports/non-existent-file.pdf',
        ]);

        $this->assertFalse(Storage::disk('private')->exists($report->file_path));
        $this->assertFalse($this->isReportDownloadable($report));
    }

    public function test_report_is_not_downloadable_when_file_path_is_null(): void
    {
        $report = new Report([
            'title' => 'Test Report',
            'filename' => 'test.pdf',
            'original_filename' => 'test.pdf',
            'file_path' => null,
            'file_size' => 1024,
            'mime_type' => 'application/pdf',
        ]);

        $this->assertFalse($this->isReportDownloadable($report));
    }

    public function test_report_is_not_downloadable_when_file_path_is_empty(): void
    {
        $report = Report::factory()->create([
            'file_path' => '',
        ]);

        $this->assertFalse($this->isReportDownloadable($report));
    }

    public function test_report_downloadability_after_file_deletion(): void
    {
        $filePath = 'reports/test-file.pdf';
        Storage::disk('private')->put($filePath, 'fake file content');
        
        $report = Report::factory()->create([
            'file_path' => $filePath,
        ]);

        $this->assertTrue($this->isReportDownloadable($report));

        Storage::disk('private')->delete($filePath);

        $this->assertFalse($this->isReportDownloadable($report));
    }

    private function isReportDownloadable(Report $report): bool
    {
        if (empty($report->file_path)) {
            return false;
        }

        return Storage::disk('private')->exists($report->file_path);
    }
}
