<?php

namespace App\Services;

use App\Models\Report;
use App\Models\ReportDownload;
use App\Models\User;
use App\Contracts\ReportInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ReportService implements ReportInterface
{
    public function getAllReports(): Collection
    {
        return Report::withCount('downloads')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function createReport(array $data, Request $request): Report
    {
        $file = $request->file('file');
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('reports', $filename, 'private');

        return Report::create([
            'title' => $data['title'],
            'filename' => $filename,
            'original_filename' => $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'description' => $data['description'] ?? null,
        ]);
    }

    public function downloadReport(Report $report, Request $request): StreamedResponse
    {
        if (!Storage::disk('private')->exists($report->file_path)) {
            abort(404);
        }

        // Track download
        ReportDownload::updateOrCreate([
            'user_id' => auth()->id(),
            'report_id' => $report->id,
        ], [
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return Storage::disk('private')->download(
            $report->file_path,
            $report->original_filename
        );
    }

    public function getReportStats(Report $report): array
    {
        $downloads = $report->downloads()->with('user')->get();
        $totalUsers = User::count();
        $downloadedUsers = $downloads->count();
        $notDownloadedUsers = User::whereNotIn('id', $downloads->pluck('user_id'))->get();

        return [
            'report' => $report,
            'downloads' => $downloads,
            'totalUsers' => $totalUsers,
            'downloadedUsers' => $downloadedUsers,
            'notDownloadedUsers' => $notDownloadedUsers,
            'engagementRate' => $totalUsers > 0 ? round(($downloadedUsers / $totalUsers) * 100, 1) : 0,
        ];
    }

    public function exportReportStats(Report $report): StreamedResponse
    {
        $downloads = $report->downloads()->with('user')->get();
        $allUsers = User::all();

        $csvData = [];
        $csvData[] = ['Report: ' . $report->title];
        $csvData[] = ['Generated: ' . now()->format('Y-m-d H:i:s')];
        $csvData[] = ['Total Users: ' . $allUsers->count()];
        $csvData[] = ['Users Who Downloaded: ' . $downloads->count()];
        $csvData[] = ['Download Rate: ' . round(($downloads->count() / $allUsers->count()) * 100, 1) . '%'];
        $csvData[] = [];
        $csvData[] = ['Name', 'Email', 'Downloaded', 'Download Date', 'IP Address'];

        foreach ($allUsers as $user) {
            $download = $downloads->where('user_id', $user->id)->first();

            $csvData[] = [
                $user->name,
                $user->email,
                $download ? 'Yes' : 'No',
                $download ? $download->created_at->format('Y-m-d H:i:s') : '',
                $download ? $download->ip_address : ''
            ];
        }

        $filename = 'report-' . Str::slug($report->title) . '-download-stats-' . now()->format('Y-m-d') . '.csv';

        return response()->streamDownload(function() use ($csvData) {
            $file = fopen('php://output', 'w');
            foreach ($csvData as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }

    public function deleteReport(Report $report): void
    {
        Storage::disk('private')->delete($report->file_path);
        $report->delete();
    }
}
