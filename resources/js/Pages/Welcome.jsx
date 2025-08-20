import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth })
{
    return (
        <>
            <Head title="Church AGM System" />
            <div className="bg-gray-50 text-black/50 min-h-screen flex flex-col items-center justify-center selection:bg-blue-500 selection:text-white">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                    <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                        <div className="flex lg:justify-center lg:col-start-2">
                            <h1 className="text-3xl font-bold text-gray-900">Church AGM System</h1>
                        </div>
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {auth.user ? (
                                <Link
                                    href={route('reports.index')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="mt-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center">
                                <div className="mb-8">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                        Welcome to Our Church AGM Portal
                                    </h2>
                                    <p className="text-xl text-gray-600 mb-8">
                                        Access important Annual General Meeting documents and reports securely
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-blue-50 p-6 rounded-lg">
                                        <div className="text-blue-600 text-3xl mb-4">📄</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Access Reports
                                        </h3>
                                        <p className="text-gray-600">
                                            Download AGM documents, financial reports, and meeting minutes
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-6 rounded-lg">
                                        <div className="text-green-600 text-3xl mb-4">🔒</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Secure Access
                                        </h3>
                                        <p className="text-gray-600">
                                            Protected member-only area with secure authentication
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-6 rounded-lg">
                                        <div className="text-purple-600 text-3xl mb-4">📊</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Stay Informed
                                        </h3>
                                        <p className="text-gray-600">
                                            Get notifications about new reports and important updates
                                        </p>
                                    </div>
                                </div>

                                {!auth.user && (
                                    <div className="flex justify-center space-x-4">
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
                                        >
                                            Register Now
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                )}

                                {auth.user && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                        Welcome back, {auth.user.name}! Ready to access your AGM reports?
                                        <div className="mt-4">
                                            <Link
                                                href={route('reports.index')}
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                                            >
                                                View Reports
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>

                    <footer className="py-16 text-center text-sm text-black">
                        Community of Faith Church
                        <br />
                        AGM Management System - Secure, Simple, Effective by <strong>Taylor Lokombe</strong>
                        <br />
                        <span>Contact: taylorcpt1@gmail.com</span>
                    </footer>
                </div>
            </div>
        </>
    );
}
