import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';

export default function Success()
{
    return (
        <GuestLayout>
            <Head title="Registration Successful" />

            <div className="text-center">
                <div className="mb-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Registration Successful!</h2>
                    <p className="mt-2 text-gray-600">
                        Thank you for registering for the Annual General Meeting.
                    </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">What's Next?</h3>
                    <ul className="text-blue-800 text-sm space-y-1">
                        <li>• You will receive a link to register to have access to the AGM reports</li>
                        <li>• For any questions, please contact the church office</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <Link href={route('welcome')}>
                        <PrimaryButton>
                            Return to Home
                        </PrimaryButton>
                    </Link>

                    <div>
                        <Link
                            href={route('agm.register')}
                            className="text-sm text-gray-600 hover:text-gray-900 underline"
                        >
                            Register another person
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}