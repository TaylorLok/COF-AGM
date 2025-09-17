<?php

namespace App\Http\Controllers;

use App\Models\AgmRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class AgmRegistrationController extends Controller
{
    public function create()
    {
        return Inertia::render('AgmRegistration/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'membership_status' => ['required', Rule::in(['member', 'visitor', 'guest'])],
            'attendance_type' => ['required', Rule::in(['in_person', 'virtual'])],
            'special_requirements' => 'nullable|string|max:1000',
        ]);

        $validated['ip_address'] = $request->ip();
        $validated['user_agent'] = $request->userAgent();
        $validated['registered_at'] = now();

        AgmRegistration::create($validated);

        return redirect()->route('agm.success')
            ->with('message', 'Thank you for registering for the AGM. We look forward to seeing you!');
    }

    public function success()
    {
        return Inertia::render('AgmRegistration/Success');
    }

    public function index()
    {
        $this->authorize('viewAny', AgmRegistration::class);

        $registrations = AgmRegistration::query()
            ->orderBy('registered_at', 'desc')
            ->paginate(20);

        $stats = [
            'total' => AgmRegistration::count(),
            'members' => AgmRegistration::members()->count(),
            'visitors' => AgmRegistration::visitors()->count(),
            'guests' => AgmRegistration::guests()->count(),
            'in_person' => AgmRegistration::inPerson()->count(),
            'virtual' => AgmRegistration::virtual()->count(),
        ];

        return Inertia::render('AgmRegistration/Index', [
            'registrations' => $registrations,
            'stats' => $stats,
        ]);
    }

    public function export()
    {
        $this->authorize('viewAny', AgmRegistration::class);

        $registrations = AgmRegistration::orderBy('registered_at', 'desc')->get();

        $csvData = "Name,Surname,Email,Phone,Membership Status,Attendance Type,Special Requirements,Registered At\n";

        foreach ($registrations as $registration) {
            $csvData .= sprintf(
                "\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                $registration->name,
                $registration->surname,
                $registration->email,
                $registration->phone ?? '',
                $registration->membership_status,
                $registration->attendance_type,
                str_replace('"', '""', $registration->special_requirements ?? ''),
                $registration->registered_at->format('Y-m-d H:i:s')
            );
        }

        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="agm_registrations_' . now()->format('Y_m_d') . '.csv"');
    }
}