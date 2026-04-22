import { Head } from '@inertiajs/react';


export function BarangayDetails() {
    return (
    <>
         <Head title="Registration" />
        <div>
            Barangay Details
        </div>
    </>
    );
}

BarangayDetails.layout = {
    breadcrumbs: [
        {

        title: 'Registration',
        href: '/registration/brgy-details',

        },
    ]
};

export default BarangayDetails;