import { Head, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { SectionCards } from '@/components/vaccine_components/dashboard-top-card';
import { ChartBarDefault } from '@/components/vaccine_components/dashboard-bar-chart';
import { ChartAreaDefault } from '@/components/vaccine_components/dashboard-chart-area';
import { Bookmark } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DataTable } from './dashboard-data-table';
import { columns, AvailabilityType } from './dashboard-column-availability';
import { VaccineType } from './vaccine-management/column';
export default function Dashboard() {
    const availability: AvailabilityType[] = [
        {
            vaccine_id: 125,
            status: "inactive",
        },
        {
            vaccine_id: 125,
            status: "inactive",
        },
        {
            vaccine_id: 125,
            status: "inactive",
        },
    ]
    interface PageProps {
        [key: string]: unknown
        total_vaccines: VaccineType
    }

    const { total_vaccines } = usePage<PageProps>().props
    console.log(total_vaccines);

    const totalVaccine = total_vaccines.length
    const totalBarangay = 5
    const totalRequest = 5
    const totalStockAlert = 5

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Label className='text-md flex items-center'>Dashboard</Label>
                <span className="text-sm text-muted-foreground">
                    Overview of vaccination data and statistics.
                </span>

                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <SectionCards total={totalVaccine} title={'Total Vaccines'} description={`Total number of vaccines.`}></SectionCards>
                    <SectionCards total={totalBarangay} title={'Total Registry Barangay'} description={`Total number of barangays in the registry.`}></SectionCards>
                    <SectionCards total={totalRequest} title={'Total Requests'} description={`Total number of requests.`}></SectionCards>
                    <SectionCards total={totalStockAlert} title={'Total Stock Alerts'} description={`Total number of stock alerts.`}></SectionCards>
                </div>
                <div className="grid gap-4 auto-rows-min md:grid-cols-1 lg:grid-cols-4">

                    {/* Dashboard Char */}
                    <div className='grid md:grid-cols-2 lg:col-span-3 gap-4'>
                        <div>
                            <ChartBarDefault />
                        </div>
                        <div>
                            <ChartAreaDefault />
                        </div>
                    </div>

                    {/* Dashboard Vaccine Availabilit & Summaries */}
                    <div className='grid gap-4'>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between gap-2">
                                    Vaccine
                                    <Label className="text-xs text-blue-500 hover:underline items-center cursor-pointer">
                                        View all
                                    </Label>
                                </CardTitle>
                                <span className="text-sm text-muted-foreground">
                                    Current vaccine availability status.
                                </span>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={availability}></DataTable>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bookmark className='text-yellow-500' />
                                    Summary of Request
                                </CardTitle>
                                <span className="text-sm text-muted-foreground">
                                    Summary of total vaccine requests.
                                </span>
                            </CardHeader>
                            <CardContent>
                                <DataTable columns={columns} data={availability}></DataTable>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
