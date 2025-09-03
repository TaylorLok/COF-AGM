<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Redirect dashboard to reports
Route::get('/dashboard', function () {
    return redirect()->route('reports.index');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Reports
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('/reports', [ReportController::class, 'store'])->name('reports.store');
    Route::get('/reports/{report}/download', [ReportController::class, 'download'])->name('reports.download');
    Route::get('/reports/{report}/view', [ReportController::class, 'view'])->name('reports.view');
    Route::get('/reports/{report}/serve', [ReportController::class, 'serve'])->name('reports.serve');
    Route::get('/reports/{report}/stats', [ReportController::class, 'stats'])->name('reports.stats');
    Route::get('/reports/{report}/export-stats', [ReportController::class, 'exportStats'])->name('reports.export-stats');
    Route::delete('/reports/{report}', [ReportController::class, 'destroy'])->name('reports.destroy');

    // Admin Users Export
    Route::get('/admin/users/export', [UserController::class, 'exportAllUsers'])->name('admin.users.export');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
