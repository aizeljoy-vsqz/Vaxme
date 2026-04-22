import { Head } from '@inertiajs/react';
import { Plus } from "lucide-react";
import {Label} from '@/components/ui/label';
import {
    Card, 
    CardHeader, 
    CardContent
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";

interface BarangayData {
    name: string;
    type: string;
    contactName: string;
    contactNumber: string;
}

const barangays: BarangayData[] = [
    {name:"", type:"", contactName:"", contactNumber:"" },
    {name:"", type:"", contactName:"", contactNumber:"" },
    {name:"", type:"", contactName:"", contactNumber:"" },
    {name:"", type:"", contactName:"", contactNumber:"" },
    {name:"", type:"", contactName:"", contactNumber:"" }

]

export default function Registration() {
    return (
        <>
            <Head title="Registration" />
            <div className="flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
            <Label className="text-lg font semibold">Barangay Registration</Label>
	<Button className="bg-blue-500  hover:bg-blue-700">
              <Plus/>
            Register New Barangay
         </Button> 
        </div>
        <div className='px-2'>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-2">
                    {barangays.map((b, idx) => (
                    <Card key={idx} className="w-full">
                        <CardHeader className="relative pb-4 pt-6">
                        
                        <div className="text-center space-y-1">
                            <div className="pt-2 text-sm font-medium text-center">
                            
                            </div>
                        </div>
                        </CardHeader>

                        <div className="px-6">
                        </div>

                        <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
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