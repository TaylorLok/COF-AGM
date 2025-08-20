<?php

namespace App\Contracts;

use App\Models\Report;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

interface ReportInterface
{
    public function getAllReports(): Collection;
    public function createReport(array $data, Request $request): Report;
    public function downloadReport(Report $report, Request $request): StreamedResponse;
    public function getReportStats(Report $report): array;
    public function exportReportStats(Report $report): StreamedResponse;
    public function deleteReport(Report $report): void;
}
