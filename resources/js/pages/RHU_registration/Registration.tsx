import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronRight, CircleCheckBig, Mail, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import DeleteConfirmDialog from '@/components/feedback/DeleteConfirmDialog';
import EmptySearchState from '@/components/feedback/EmptySearchState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import registrationRoutes from '@/routes/registration';
import { DetailsPage } from './Dialogs_Details/Details';
import { EditBarangayDialog } from './Dialogs_Edit/Edit_barangay';
import EmptyPage from '@/components/vaccine_components/empty-page';

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
    const [deleteTarget, setDeleteTarget] = useState<BarangayCard | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredBarangays = useMemo(() => {
        if (!searchQuery.trim()) {
            return registrationBarangays;
        }

        const query = searchQuery.toLowerCase();

        return registrationBarangays.filter((barangay) =>
            barangay.barangay_name.toLowerCase().includes(query) ||
            barangay.nurse_assigned.toLowerCase().includes(query) ||
            barangay.contact_number.toLowerCase().includes(query),
        );
    }, [registrationBarangays, searchQuery]);

    const handleDeleteClick = (barangay: BarangayCard) => {
        setDeleteTarget(barangay);
        setDeleteOpen(true);
    };

    const confirmDelete = () => {
        if (!deleteTarget) {
            return;
        }

        setIsDeleting(true);

        destroy(`/registration/${deleteTarget.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteOpen(false);
                setDeleteTarget(null);
                toast(
                    <div className="flex items-center gap-2">
                        <CircleCheckBig className="h-4 w-4 text-emerald-600" />
                        Successfully deleted.
                    </div>,
                    { position: 'top-right' },
                );
            },
            onError: () => {
                setDeleteOpen(false);
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    return (
        <>
            <Head title="Registration" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col">
                    <div className="mb-6 flex items-center justify-between">
                        <Label className="text-lg font-semibold">Barangay Registration</Label>
                        <DetailsPage existingBarangays={registrationBarangays} />
                    </div>
                    {/* Empty State */}
                    {registrationBarangays.length === 0 ? (
                        <EmptyPage title="No Registered Barangays Found" description="You have no registered barangays to display." />
                    ) : (
                        <>
                            <div className="px-2">
                                <Input
                                    placeholder="Search..."
                                    className="mb-4 max-w-sm"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 px-2 md:grid-cols-2 lg:grid-cols-4">
                                {filteredBarangays.length > 0 ? (
                                    filteredBarangays.map((barangay) => (
                                        <Card key={barangay.id} className="w-full">
                                            <CardHeader className="relative pb-4 pt-6">
                                                <div className="absolute -top-3 right-5">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="cursor-pointer">
                                                                &#8230;
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <EditBarangayDialog barangay={barangay} />
                                                            <DropdownMenuItem onClick={() => handleDeleteClick(barangay)}>
                                                                <span className="cursor-pointer text-red-600 transition-colors hover:text-red-700">
                                                                    Delete
                                                                </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                <div className="space-y-1 text-center">
                                                    <CardTitle className="text-xl font-bold">{barangay.barangay_name}</CardTitle>
                                                    <p className="text-sm text-muted-foreground">Barangay</p>
                                                    <div className="pt-2 text-center text-sm font-medium">
                                                        <Link href={registrationRoutes.brgyDetails.url({ query: { bhc_id: barangay.id } })}>
                                                            <Button
                                                                variant="ghost"
                                                                className="absolute right-2 flex cursor-pointer items-center text-sm text-muted-foreground"
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
                                                <Label className="-top-3 text-sm font-semibold text-muted-foreground">Details</Label>

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
                        </>
                    )}

                </div>
            </div>

            <DeleteConfirmDialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    setDeleteOpen(open);

                    if (!open) {
                        setDeleteTarget(null);
                    }
                }}
                title="Delete barangay?"
                description={
                    deleteTarget
                        ? `This will permanently delete ${deleteTarget.barangay_name}, its related account, and population records.`
                        : 'This action cannot be undone.'
                }
                onConfirm={confirmDelete}
                isProcessing={isDeleting}
            />
        </>
    );
}

Registration.layout = {
    breadcrumbs: [
        {
            title: 'Registration',
            href: '/registration',
        },
    ],
};
