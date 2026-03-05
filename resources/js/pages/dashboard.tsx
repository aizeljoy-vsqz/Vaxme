import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import { CircleAlert, ClipboardCheck, Clock, MapPinHouse, } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/*Container for summary cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {/* Total Vaccines */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Total Vaccines</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                1,256
                            </CardTitle>
                            <CardAction className='bg-green-100 p-2 rounded-sm'>
                                <ClipboardCheck className='text-green-500' />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground">
                                Total for this month
                            </div>
                        </CardFooter>
                    </Card>
                    {/* Total Registered Barangay */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Total Registered Barangay</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                25
                            </CardTitle>
                            <CardAction className='bg-blue-100 p-2 rounded-sm'>
                                <MapPinHouse className='text-blue-500' />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground">
                                Total for this month
                            </div>
                        </CardFooter>
                    </Card>
                    {/* Total Pending Request */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Pending Request</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                4
                            </CardTitle>
                            <CardAction className='bg-orange-100 p-2 rounded-sm'>
                                <Clock className='text-orange-500' />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground">
                                Total for this month
                            </div>
                        </CardFooter>
                    </Card>
                    {/* Low Stock Alert */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription>Low Stock Alert</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                12
                            </CardTitle>
                            <CardAction className='bg-red-100 p-2 rounded-sm'>
                                <CircleAlert className='text-red-500' />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground">
                                Total for this month
                            </div>
                        </CardFooter>
                    </Card>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {/*Container for charts */}
                    <div className='lg:col-span-3 flex flex-col gap-4'>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern className=''></PlaceholderPattern>
                        </div>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern></PlaceholderPattern>
                        </div>
                    </div>
                    {/*Container for calendar and others */}
                    <div className='flex flex-col gap-4'>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern></PlaceholderPattern>
                        </div>
                        <div className='rounded-xl border'>
                            <PlaceholderPattern></PlaceholderPattern>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
