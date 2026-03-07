import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Upload} from 'lucide-react';
import PopulationTable from '../Barangay_Details/Details/details';


const breadcrumbs: BreadcrumbItem[] = [
     { 
        title: 'Registration',
        href: '/registration/brgy-details'
    },
];

export function BarangayDetails() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-2">
               <Label className="text-lg font semibold">Barangay Alawihao Registration (2024)</Label>
                <Button variant="outline"
                className="text-blue-500 border-blue-400 hover:bg-blue-600 hover:text-white">
                        <Upload/>
                        Export
                   </Button> 
            </div >
            <div className='px-2'>
             <PopulationTable />
            </div>
        </div>
        </AppLayout>
    );
}
export default BarangayDetails;