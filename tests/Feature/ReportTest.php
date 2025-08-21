<?php

namespace Tests\Feature;

use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('private');
    }

    public function test_guest_cannot_access_reports_index(): void
    {
        $response = $this->get(route('reports.index'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_user_can_view_reports_index(): void
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('reports.index'));
        $response->assertStatus(200);
    }

    public function test_only_admin_can_create_reports(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($user)->get(route('reports.create'))->assertStatus(403);
        $this->actingAs($admin)->get(route('reports.create'))->assertStatus(200);
    }

    public function test_admin_can_store_report(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $file = UploadedFile::fake()->create('test-report.pdf', 1024);

        $response = $this->actingAs($admin)->post(route('reports.store'), [
            'title' => 'Test Report',
            'description' => 'This is a test report',
            'file' => $file,
        ]);

        $response->assertRedirect(route('reports.index'));
        $response->assertSessionHas('success', 'Report uploaded successfully!');

        $this->assertDatabaseHas('reports', [
            'title' => 'Test Report',
            'description' => 'This is a test report',
            'original_filename' => 'test-report.pdf',
        ]);
    }

    public function test_non_admin_cannot_store_report(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $file = UploadedFile::fake()->create('test-report.pdf', 1024);

        $response = $this->actingAs($user)->post(route('reports.store'), [
            'title' => 'Test Report',
            'description' => 'This is a test report',
            'file' => $file,
        ]);

        $response->assertStatus(403);
    }

    public function test_report_creation_requires_valid_data(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $response = $this->actingAs($admin)->post(route('reports.store'), []);
        $response->assertSessionHasErrors(['title', 'file']);

        $response = $this->actingAs($admin)->post(route('reports.store'), [
            'title' => '',
            'file' => 'not-a-file',
        ]);
        $response->assertSessionHasErrors(['title', 'file']);
    }

    public function test_user_can_download_report(): void
    {
        $user = User::factory()->create();
        Storage::disk('private')->put('reports/test-file.pdf', 'fake content');
        
        $report = Report::factory()->create([
            'file_path' => 'reports/test-file.pdf',
            'original_filename' => 'original-name.pdf',
        ]);

        $response = $this->actingAs($user)->get(route('reports.download', $report));
        $response->assertStatus(200);

        $this->assertDatabaseHas('report_downloads', [
            'user_id' => $user->id,
            'report_id' => $report->id,
        ]);
    }

    public function test_download_fails_for_missing_file(): void
    {
        $user = User::factory()->create();
        $report = Report::factory()->create([
            'file_path' => 'reports/non-existent-file.pdf',
        ]);

        $response = $this->actingAs($user)->get(route('reports.download', $report));
        $response->assertStatus(404);
    }

    public function test_only_admin_can_view_report_stats(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $admin = User::factory()->create(['is_admin' => true]);
        $report = Report::factory()->create();

        $this->actingAs($user)->get(route('reports.stats', $report))->assertStatus(403);
        $this->actingAs($admin)->get(route('reports.stats', $report))->assertStatus(200);
    }

    public function test_only_admin_can_export_report_stats(): void
    {
        $user = User::factory()->create(['is_admin' => false]);
        $admin = User::factory()->create(['is_admin' => true]);
        $report = Report::factory()->create();

        $this->actingAs($user)->get(route('reports.export-stats', $report))->assertStatus(403);
        $this->actingAs($admin)->get(route('reports.export-stats', $report))->assertStatus(200);
    }

    public function test_only_admin_can_delete_report(): void
    {
        Storage::disk('private')->put('reports/test-file.pdf', 'fake content');
        
        $user = User::factory()->create(['is_admin' => false]);
        $admin = User::factory()->create(['is_admin' => true]);
        $report = Report::factory()->create([
            'file_path' => 'reports/test-file.pdf',
        ]);

        $this->actingAs($user)->delete(route('reports.destroy', $report))->assertStatus(403);

        $response = $this->actingAs($admin)->delete(route('reports.destroy', $report));
        $response->assertRedirect(route('reports.index'));
        $response->assertSessionHas('success', 'Report deleted successfully!');

        $this->assertSoftDeleted('reports', ['id' => $report->id]);
        Storage::disk('private')->assertMissing('reports/test-file.pdf');
    }

    public function test_report_tracks_multiple_downloads_per_user(): void
    {
        $user = User::factory()->create();
        Storage::disk('private')->put('reports/test-file.pdf', 'fake content');
        
        $report = Report::factory()->create([
            'file_path' => 'reports/test-file.pdf',
        ]);

        $this->actingAs($user)->get(route('reports.download', $report));
        $this->actingAs($user)->get(route('reports.download', $report));

        $this->assertEquals(1, $report->downloads()->count());
    }

    public function test_report_download_updates_tracking_info(): void
    {
        $user = User::factory()->create();
        Storage::disk('private')->put('reports/test-file.pdf', 'fake content');
        
        $report = Report::factory()->create([
            'file_path' => 'reports/test-file.pdf',
        ]);

        $response = $this->actingAs($user)
            ->withHeaders(['User-Agent' => 'Test Browser'])
            ->get(route('reports.download', $report));

        $download = $report->downloads()->first();
        $this->assertEquals($user->id, $download->user_id);
        $this->assertEquals('127.0.0.1', $download->ip_address);
        $this->assertEquals('Test Browser', $download->user_agent);
    }
}
