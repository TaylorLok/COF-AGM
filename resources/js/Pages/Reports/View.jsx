import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    DocumentArrowDownIcon,
    ArrowLeftIcon,
    DocumentIcon,
} from '@heroicons/react/24/outline';

export default function View({ auth, report, fileUrl }) {
    const formatFileSize = (bytes) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        
        while (size > 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
    };

    const isPreviewable = (mimeType) => {
        return mimeType && (
            mimeType.startsWith('text/') ||
            mimeType === 'application/pdf' ||
            mimeType.startsWith('image/')
        );
    };

    const getFilePreviewUrl = () => {
        return fileUrl;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link
                            href={route('reports.index')}
                            className="text-blue-600 hover:text-blue-800 mr-4"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </Link>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {report.title}
                        </h2>
                    </div>
                    <a
                        href={route('reports.download', report.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center"
                    >
                        <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                        Download
                    </a>
                </div>
            }
        >
            <Head title={`View Report - ${report.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Report Info */}
                            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">File Name</h3>
                                        <p className="mt-1 text-sm text-gray-900">{report.original_filename}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">File Size</h3>
                                        <p className="mt-1 text-sm text-gray-900">{formatFileSize(report.file_size)}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Upload Date</h3>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(report.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Downloads</h3>
                                        <p className="mt-1 text-sm text-gray-900">{report.downloads.length}</p>
                                    </div>
                                </div>
                                {report.description && (
                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                        <p className="mt-1 text-sm text-gray-900">{report.description}</p>
                                    </div>
                                )}
                            </div>

                            {/* File Preview */}
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                    <DocumentIcon className="w-5 h-5 mr-2" />
                                    Document Preview
                                </h3>
                                
                                {isPreviewable(report.mime_type) ? (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        {report.mime_type === 'application/pdf' ? (
                                            <div className="text-center">
                                                <embed
                                                    src={getFilePreviewUrl()}
                                                    type="application/pdf"
                                                    width="100%"
                                                    height="600px"
                                                    className="rounded border"
                                                />
                                                <p className="mt-2 text-sm text-gray-600">
                                                    PDF preview. If the document doesn't load properly, please download it.
                                                </p>
                                            </div>
                                        ) : report.mime_type?.startsWith('image/') ? (
                                            <div className="text-center">
                                                <img
                                                    src={getFilePreviewUrl()}
                                                    alt={report.title}
                                                    className="max-w-full h-auto rounded border"
                                                />
                                            </div>
                                        ) : report.mime_type?.startsWith('text/') ? (
                                            <div className="text-center">
                                                <iframe
                                                    src={getFilePreviewUrl()}
                                                    width="100%"
                                                    height="600px"
                                                    className="rounded border bg-white"
                                                    title={report.title}
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-600">
                                                    Text file preview is not yet implemented. Please download the file to view its contents.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 rounded-lg p-8 text-center">
                                        <DocumentIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                        <h4 className="text-lg font-medium text-gray-900 mb-2">Preview Not Available</h4>
                                        <p className="text-gray-600 mb-4">
                                            This file type cannot be previewed in the browser.
                                            Please download the file to view its contents.
                                        </p>
                                        <a
                                            href={route('reports.download', report.id)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                                            Download File
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}