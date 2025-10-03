import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children })
{
    return (
        <div className="min-h-screen bg-gray-100 pt-6 sm:pt-0">
            <div className="flex flex-col items-center">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>

                <div className="mt-8 w-full max-w-md">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
