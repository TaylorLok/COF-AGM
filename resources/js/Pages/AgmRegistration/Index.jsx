import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, registrations, stats })
{
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">AGM Registrations</h2>}
        >
            <Head title="AGM Registrations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="text-lg font-semibold text-gray-900">{stats.total}</div>
                            <div className="text-sm text-gray-600">Total Registered</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="text-lg font-semibold text-blue-600">{stats.members}</div>
                            <div className="text-sm text-gray-600">Members</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="text-lg font-semibold text-green-600">{stats.visitors}</div>
                            <div className="text-sm text-gray-600">Visitors</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="text-lg font-semibold text-purple-600">{stats.guests}</div>
                            <div className="text-sm text-gray-600">Guests</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="text-lg font-semibold text-orange-600">{stats.in_person}</div>
                            <div className="text-sm text-gray-600">In Person</div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <div className="text-lg font-semibold text-indigo-600">{stats.virtual}</div>
                            <div className="text-sm text-gray-600">Virtual</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-lg font-medium text-gray-900">Registration List</h3>
                        <div className="flex space-x-3">
                            <Link href={route('agm.export')}>
                                <PrimaryButton className="bg-green-600 hover:bg-green-700">
                                    Export CSV
                                </PrimaryButton>
                            </Link>
                            <Link href={route('agm.register')}>
                                <PrimaryButton>
                                    Add Registration
                                </PrimaryButton>
                            </Link>
                        </div>
                    </div>

                    {/* Registrations Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Attendance
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registered
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registrations.data.map((registration) => (
                                        <tr key={registration.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {registration.name} {registration.surname}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{registration.email}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{registration.phone || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    registration.membership_status === 'member' ? 'bg-blue-100 text-blue-800' :
                                                    registration.membership_status === 'visitor' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                                }`}>
                                                    {registration.membership_status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    registration.attendance_type === 'in_person' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-indigo-100 text-indigo-800'
                                                }`}>
                                                    {registration.attendance_type === 'in_person' ? 'In Person' : 'Virtual'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(registration.registered_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {registrations.last_page > 1 && (
                            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-700">
                                        Showing {registrations.from} to {registrations.to} of {registrations.total} results
                                    </div>
                                    <div className="flex space-x-2">
                                        {registrations.prev_page_url && (
                                            <Link
                                                href={registrations.prev_page_url}
                                                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                            >
                                                Previous
                                            </Link>
                                        )}
                                        {registrations.next_page_url && (
                                            <Link
                                                href={registrations.next_page_url}
                                                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                            >
                                                Next
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}