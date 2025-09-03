import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import
{
    DocumentArrowDownIcon,
    TrashIcon,
    ChartBarIcon,
    PlusIcon,
    EyeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';

export default function Index({ auth, reports, canCreate, flash })
{
    const handleDelete = (report) =>
    {
        if (confirm('Are you sure you want to delete this report?'))
        {
            router.delete(route('reports.destroy', report.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        AGM Reports
                    </h2>
                    <div className="flex space-x-3">
                        {canCreate && (
                            <>
                                <a
                                    href={route('admin.users.export')}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                                >
                                    <UsersIcon className="w-5 h-5 mr-2" />
                                    Export Users
                                </a>
                                <Link
                                    href={route('reports.create')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Upload Report
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="AGM Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                            {flash.success}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {reports.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Uploaded At
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Downloads
                                                </th>
                                                {auth.user.is_admin && (
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Views
                                                    </th>
                                                )}
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {reports.map((report) => (
                                                <tr key={report.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {report.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(report.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {report.downloads_count}
                                                    </td>
                                                    {auth.user.is_admin && (
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {report.views_count}
                                                        </td>
                                                    )}
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        {/* View */}
                                                        <Link
                                                            href={route('reports.view', report.id)}
                                                            className="text-green-600 hover:text-green-900 inline-flex items-center"
                                                        >
                                                            <EyeIcon className="w-5 h-5 mr-1" />
                                                            View
                                                        </Link>

                                                        {/* Download */}
                                                        <a
                                                            href={route('reports.download', report.id)}
                                                            className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                                                        >
                                                            <DocumentArrowDownIcon className="w-5 h-5 mr-1" />
                                                            Download
                                                        </a>

                                                        {/* Stats (admin only) */}
                                                        {auth.user.is_admin && (
                                                            <Link
                                                                href={route('reports.stats', report.id)}
                                                                className="text-purple-600 hover:text-purple-900 inline-flex items-center"
                                                            >
                                                                <ChartBarIcon className="w-5 h-5 mr-1" />
                                                                Stats
                                                            </Link>
                                                        )}

                                                        {/* Delete (admin only) */}
                                                        {canCreate && (
                                                            <button
                                                                onClick={() => handleDelete(report)}
                                                                className="text-red-600 hover:text-red-900 inline-flex items-center"
                                                            >
                                                                <TrashIcon className="w-5 h-5 mr-1" />
                                                                Delete
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No reports uploaded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
