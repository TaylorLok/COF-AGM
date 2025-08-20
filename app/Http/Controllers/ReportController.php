<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Http\Requests\ReportRequests\StoreReportRequest;

class ReportController extends Controller
{
    public function __construct(
        protected ReportService $reportService
    ) {}

    public function index(): InertiaResponse
    {
        $reports = $this->reportService->getAllReports();

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
            'canCreate' => auth()->user()->isAdmin(),
        ]);
    }

    public function create(): InertiaResponse
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('Reports/Create');
    }

    public function store(StoreReportRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $this->reportService->createReport($validated, $request);

        return redirect()->route('reports.index')
                        ->with('success', 'Report uploaded successfully!');
    }

    public function download(Report $report, Request $request): StreamedResponse
    {
        return $this->reportService->downloadReport($report, $request);
    }

    public function stats(Report $report): InertiaResponse
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $stats = $this->reportService->getReportStats($report);

        return Inertia::render('Reports/Stats', $stats);
    }

    public function exportStats(Report $report): StreamedResponse
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return $this->reportService->exportReportStats($report);
    }

    public function destroy(Report $report): RedirectResponse
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $this->reportService->deleteReport($report);

        return redirect()->route('reports.index')
                        ->with('success', 'Report deleted successfully!');
    }
}
