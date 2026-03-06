import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { User, Mail, Plus, ChevronRight} from "lucide-react";
import {Label} from '@/components/ui/label';
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
import {Input} from "@/components/ui/input";

const breadcrumbs: BreadcrumbItem[] = [
    { 
        title: 'Registration',
        href: '/registration'
    },
];
interface BarangayData {
    name: string;
    type: string;
    contactName: string;
    contactNumber: string;
}

const barangays: BarangayData[] = [
    {name:"Alawihao", type:"Barangay", contactName:"Aizel Joy Vasquez", contactNumber:"(63) 9936706096" },
    {name:"Cobangbang", type:"Barangay", contactName:"John Carlo Magana", contactNumber:"(63) 9936706096" },
    {name:"Moreno", type:"Barangay", contactName:"Ysmin Rose Reantazo", contactNumber:"(63) 9936706096" },
    {name:"San Isidro", type:"Barangay", contactName:"Rhanie Mel Reyes", contactNumber:"(63) 9936706096" },
    {name:"San Isidro", type:"Barangay", contactName:"Rhanie Mel Reyes", contactNumber:"(63) 9936706096" }

]

export default function Registration() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
    <div className="flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
            <Label className="text-lg font semibold">Barangay Registration</Label>
            <Button className="bg-blue-500  hover:bg-blue-700">
                <Plus/>
                Register New Barangay
            </Button>
        </div>
        <div className='px-2'>
            <Input placeholder="Search..." className="mb-6 max-w-sm"/>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-2">
                    {barangays.map((b, idx) => (
                    <Card key={idx} className="w-full">
                        <CardHeader className="relative pb-6 pt-6">
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
                            <p className="text-muted-foreground text-sm">{b.type}</p>
                            <div className="pt-2 text-sm font-medium text-center">
                            <Button
                                variant="ghost"
                                className="absolute right-2 text-muted-foreground text-sm flex items-center gap-1"
                            > 
                                View details
                                <ChevronRight/>
                            </Button>
                            </div>
                        </div>
                        </CardHeader>

                        <div className="px-6">
                            <Separator />
                        </div>

                        <CardContent className="space-y-3">
                        <h4 className="text-sm font-semibold text-muted-foreground">Contact</h4>

                        <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">{b.contactName}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">{b.contactNumber}</span>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}