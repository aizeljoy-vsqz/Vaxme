import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardFooter } from '@/components/ui/card';
import { Bookmark, BookMarked, CircleAlert, ClipboardCheck, Clock, MapPinHouse, } from 'lucide-react';
import { ChartBarDefault } from '@/components/chart-bar-default';
import { ChartAreaDefault } from '@/components/chart-area-default';
import { CalendarDemo } from '@/components/calendar';
import { VaccineTab } from '@/components/tab';
import { Separator } from '@/components/ui/separator';
import { DashboardSummary } from '@/components/table-summary';

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
                            <CardDescription className='text-primary font-medium'>Total Vaccines</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                1,256
                            </CardTitle>
                            <CardAction className='bg-blue-100 p-2 rounded-sm'>
                                <ClipboardCheck className='text-blue-500 w-4 h-4' />
                            </CardAction>
                            <div className="text-muted-foreground text-xs">
                                Total for this month
                            </div>
                        </CardHeader>
                    </Card>
                    {/* Total Registered Barangay */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription className='text-primary font-medium'>Total Barangay</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                25
                            </CardTitle>
                            <CardAction className='bg-green-100 p-2 rounded-sm'>
                                <MapPinHouse className='text-green-500 w-4 h-4' />
                            </CardAction>
                            <div className="text-muted-foreground text-xs">
                                Total for this month
                            </div>
                        </CardHeader>
                    </Card>
                    {/* Total Pending Request */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription className='text-primary font-medium'>Pending Request</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                4
                            </CardTitle>
                            <CardAction className='bg-orange-100 p-2 rounded-sm'>
                                <Clock className='text-orange-500 w-4 h-4' />
                            </CardAction>
                            <div className="text-muted-foreground text-xs">
                                Total for this month
                            </div>
                        </CardHeader>
                    </Card>
                    {/* Low Stock Alert */}
                    <Card className="@container/card">
                        <CardHeader>
                            <CardDescription className='text-primary font-medium'>Low Stock Alert</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                12
                            </CardTitle>
                            <CardAction className='bg-red-100 p-2 rounded-sm'>
                                <CircleAlert className='text-red-500 w-4 h-4' />
                            </CardAction>
                            <div className="text-muted-foreground text-xs">
                                Total for this month
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                    {/*Container for charts */}
                    <div className='lg:col-span-3 flex flex-col gap-4'>
                        <ChartAreaDefault></ChartAreaDefault>
                        <ChartBarDefault></ChartBarDefault>
                    </div>
                    {/*Container for calendar and others */}
                    <div className='flex flex-col gap-4'>
                        <CalendarDemo></CalendarDemo>
                        <VaccineTab></VaccineTab>
                        <DashboardSummary></DashboardSummary>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
