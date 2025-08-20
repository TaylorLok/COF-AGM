import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import
{
    ArrowDownTrayIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function Stats({
    auth,
    report,
    downloads,
    totalUsers,
    downloadedUsers,
    notDownloadedUsers,
    engagementRate
})
{
    const formatBrowser = (userAgent) =>
    {
        if (!userAgent) return 'Unknown';
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Other';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Download Statistics: {report.title}
                    </h2>
                    <div className="flex space-x-4">
                        <a
                            href={route('reports.export-stats', report.id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                        >
                            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                            Export CSV
                        </a>
                        <Link
                            href={route('reports.index')}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                        >
                            <ArrowLeftIcon className="w-5 h-5 mr-2" />
                            Back to Reports
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Statistics - ${report.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-blue-600 text-white p-6 rounded-lg">
                            <div className="text-3xl font-bold">{totalUsers}</div>
                            <div className="text-blue-100">Total Members</div>
                        </div>
                        <div className="bg-green-600 text-white p-6 rounded-lg">
                            <div className="text-3xl font-bold">{downloadedUsers}</div>
                            <div className="text-green-100">Downloaded Report</div>
                        </div>
                        <div className="bg-yellow-600 text-white p-6 rounded-lg">
                            <div className="text-3xl font-bold">{notDownloadedUsers.length}</div>
                            <div className="text-yellow-100">Not Downloaded</div>
                        </div>
                        <div className="bg-purple-600 text-white p-6 rounded-lg">
                            <div className="text-3xl font-bold">{engagementRate}%</div>
                            <div className="text-purple-100">Engagement Rate</div>
                        </div>
                    </div>

                    {/* Downloaded Users */}
                    {downloads.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Users Who Downloaded ({downloads.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {downloads.map((download) => (
                                                <tr key={download.id}>
                                                    <td className="px-4 py-2 whitespace-nowrap">{download.user?.name}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{download.user?.email}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {new Date(download.created_at).toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{download.ip_address}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {formatBrowser(download.user_agent)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Users Who Have Not Downloaded */}
                    {notDownloadedUsers.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Users Who Have Not Downloaded ({notDownloadedUsers.length})
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {notDownloadedUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

