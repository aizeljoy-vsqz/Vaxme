import { Head } from '@inertiajs/react';


export default function Registration() {
    return (
        <>
 	<Head title="Registration" />
            <div>
                Barangay Details
            </div>
 	</>
    );
}

Registration.layout = {
    breadcrumbs: [
        {

        title: 'Registration',
        href: '/registration',

        },
    ]
};