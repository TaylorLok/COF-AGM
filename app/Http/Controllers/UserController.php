<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class UserController extends Controller
{
    public function exportAllUsers(): StreamedResponse
    {
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        $filename = 'users_export_' . now()->format('Y_m_d_H_i_s') . '.csv';

        return response()->streamDownload(function () {
            $handle = fopen('php://output', 'w');
            
            // Add CSV headers
            fputcsv($handle, [
                'ID',
                'Name',
                'Surname',
                'Email',
                'Is Admin',
                'Created At',
                'Last Updated'
            ]);

            // Get all users and stream them
            User::chunk(1000, function ($users) use ($handle) {
                foreach ($users as $user) {
                    fputcsv($handle, [
                        $user->id,
                        $user->name,
                        $user->surname,
                        $user->email,
                        $user->is_admin ? 'Yes' : 'No',
                        $user->created_at->format('Y-m-d H:i:s'),
                        $user->updated_at->format('Y-m-d H:i:s')
                    ]);
                }
            });

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}