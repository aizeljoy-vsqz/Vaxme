import { Head } from '@inertiajs/react';
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { User, ChevronRight, Mail} from "lucide-react";
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import { DetailsPage } from './Dialogs_Details/Details';
import { EditBarangayDialog } from './Dialogs_Edit/Edit_barangay';
import EmptySearchState from '@/components/feedback/EmptySearchState';

type Barangay = {
    id: number;
    barangay_name: string;
    contact_number: string;
    nurse_assigned: string;
};

type BarangayCard = {
    id: number;
    barangay_name: string;
    contact_number: string;
    nurse_assigned: string;
};

export default function Registration({ barangays = [] }: { barangays?: Barangay[] }) {
    const registrationBarangays: BarangayCard[] = barangays.map((barangay) => ({
        id: barangay.id,
        barangay_name: barangay.barangay_name,
        contact_number: barangay.contact_number ?? 'N/A',
        nurse_assigned: barangay.nurse_assigned,
    }));
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBarangays = useMemo(() => {
        if (!searchQuery.trim()) {
            return registrationBarangays;
        }

        const q = searchQuery.toLowerCase();

        return registrationBarangays.filter((barangay) =>
            barangay.barangay_name.toLowerCase().includes(q) ||
            barangay.nurse_assigned.toLowerCase().includes(q) ||
            barangay.contact_number.toLowerCase().includes(q)
        );
    }, [registrationBarangays, searchQuery]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this barangay?')) {
            destroy(`/registration/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                },
                onError: () => {}
            });
        }
    };

    

    return (
        <>
            <Head title="Registration" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
           <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <Label className="text-lg font semibold">Barangay Registration</Label>
                <DetailsPage existingBarangays={registrationBarangays} />
            </div>
            <div className='px-2'>
                <Input 
                    placeholder="Search..." 
                    className="mb-4 max-w-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {filteredBarangays.length > 0 ? (
                    filteredBarangays.map((barangay) => (
                        <Card key={barangay.id} className="w-full">
                            <CardHeader className="relative pb-4 pt-6">
                            <div className="absolute right-5 -top-3">
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className='cursor-pointer'>
                                    &#8230;
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <EditBarangayDialog barangay={barangay} />
                                    <DropdownMenuItem onClick={() => handleDelete(barangay.id)}>
                                        <span 
                                            className="text-red-600 hover:text-red-700 cursor-pointer transition-colors"
                                        >
                                            Delete
                                    </span> 
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="text-center space-y-1">
                                <CardTitle className="text-xl font-bold">{barangay.barangay_name}</CardTitle>
                                <p className="text-muted-foreground text-sm">Barangay</p>
                                <div className="pt-2 text-sm font-medium text-center">
                                <Link href={`/registration/brgy-details?bhc_id=${barangay.id}`}>
                                    <Button
                                    variant="ghost"
                                    className="absolute right-2 cursor-pointer text-muted-foreground text-sm flex items-center"
                                    >
                                    View details
                                    <ChevronRight />
                                    </Button>
                                </Link>
                                </div>
                            </div>
                            </CardHeader>

                            <div className="px-6">
                                <Separator />
                            </div>

                            <CardContent className="space-y-2">
                                <Label className=" -top-3 text-sm font-semibold text-muted-foreground">Details</Label>

                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-gray-600" />
                                <span className="text-gray-600">{barangay.nurse_assigned}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-4 w-4 text-gray-600" />
                                <span className="text-gray-600">{barangay.contact_number}</span>
                            </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <EmptySearchState query={searchQuery} entityName="barangays" />
                )}
                </div>
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