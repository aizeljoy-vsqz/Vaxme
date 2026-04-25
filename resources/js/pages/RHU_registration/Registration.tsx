import { Head } from '@inertiajs/react';
import { User, Building2, ChevronRight} from "lucide-react";
import {Label} from '@/components/ui/label';
import { Link } from "@inertiajs/react";
import {Input} from '@/components/ui/input';
import {
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Separator} from '@/components/ui/separator';
import { DetailsPage } from './Dialogs_Details/Details';

type Barangay = {
    id: number;
    user_id: number | null;
    rhu_id: number | null;
    name: string;
    nurse_assigned: string;
};

export default function Registration({ barangays = [] }: { barangays?: Barangay[] }) {
    return (
        <>
            <Head title="Registration" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
           <div className="flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <Label className="text-lg font semibold">Barangay Registration</Label>
                <DetailsPage barangays={barangays}/>
            </div>
            <div className='px-2'>
                <Input placeholder="Search..." className="mb-4 max-w-sm"/>
                </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-2">
                        {barangays.map((b: any) => (
                        <Card key={b.id} className="w-full">
                            <CardHeader className="relative pb-4 pt-6">
                            <div className="absolute right-5 -top-3">
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                    &#8230;
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="text-center space-y-1">
                                <CardTitle className="text-xl font-bold">{b.name}</CardTitle>
                                <p className="text-muted-foreground text-sm">Barangay</p>
                                <div className="pt-2 text-sm font-medium text-center">
                                <Link href={`/registration/brgy-details?barangay_id=${b.id}`}>
                                    <Button
                                    variant="ghost"
                                    className="absolute right-2 text-muted-foreground text-sm flex items-center"
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
                                <span className="text-gray-600">{b.nurse_assigned}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Building2 className="h-4 w-4 text-gray-600" />
                                <span className="text-gray-600">{b.rhu_id ?? 'N/A'}</span>
                            </div>
                            </CardContent>
                        </Card>
                        ))}
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