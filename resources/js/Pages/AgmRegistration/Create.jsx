import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Create()
{
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        email: '',
        phone: '',
        membership_status: 'member',
        attendance_type: 'in_person',
        special_requirements: '',
    });

    const submit = (e) =>
    {
        e.preventDefault();
        post(route('agm.store'));
    };

    return (
        <GuestLayout>
            <Head title="AGM Registration" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">AGM Registration</h2>
                <p className="mt-2 text-gray-600">Register to attend our Annual General Meeting</p>
            </div>

            <form onSubmit={submit}>
                {/* First Name and Surname - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <InputLabel htmlFor="name" value="First Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="surname" value="Surname" />
                        <TextInput
                            id="surname"
                            name="surname"
                            value={data.surname}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('surname', e.target.value)}
                            required
                        />
                        <InputError message={errors.surname} className="mt-2" />
                    </div>
                </div>

                {/* Email and Phone - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number (Optional)" />
                        <TextInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="tel"
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="+27 XX XXX XXXX"
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                </div>

                {/* Membership Status */}
                <div className="mt-4">
                    <InputLabel htmlFor="membership_status" value="Membership Status" />
                    <select
                        id="membership_status"
                        name="membership_status"
                        value={data.membership_status}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setData('membership_status', e.target.value)}
                        required
                    >
                        <option value="member">Church Member</option>
                        <option value="visitor">Regular Visitor</option>
                        <option value="guest">Guest</option>
                    </select>
                    <InputError message={errors.membership_status} className="mt-2" />
                </div>

                {/* Attendance Type */}
                <div className="mt-4">
                    <InputLabel htmlFor="attendance_type" value="How will you attend?" />
                    <div className="mt-2 space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="attendance_type"
                                value="in_person"
                                checked={data.attendance_type === 'in_person'}
                                onChange={(e) => setData('attendance_type', e.target.value)}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">In Person</span>
                        </label>
                        {/* <label className="flex items-center">
                            <input
                                type="radio"
                                name="attendance_type"
                                value="virtual"
                                checked={data.attendance_type === 'virtual'}
                                onChange={(e) => setData('attendance_type', e.target.value)}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Virtual (Online)</span>
                        </label> */}
                    </div>
                    <InputError message={errors.attendance_type} className="mt-2" />
                </div>

                {/* Special Requirements */}
                <div className="mt-4">
                    <InputLabel htmlFor="special_requirements" value="Comments (Optional)" />
                    <textarea
                        id="special_requirements"
                        name="special_requirements"
                        value={data.special_requirements}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows="3"
                        onChange={(e) => setData('special_requirements', e.target.value)}
                        placeholder="If you have any comments..."
                    />
                    <InputError message={errors.special_requirements} className="mt-2" />
                </div>

                <div className="flex items-center justify-center mt-6">
                    <PrimaryButton disabled={processing}>
                        Register for AGM
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}