import { Head, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { ChartAreaDefault } from '@/components/vaccine_components/dashboard-chart-area';
import { SectionCards } from '@/components/vaccine_components/dashboard-top-card';
import { dashboard } from '@/routes';
import { useState } from "react"

export default function Dashboard() {

    interface PageProps {
        [key: string]: unknown
        vaccines_total: number
        request_total: number
        barangay_total: number
        low_stocks_total: number
        vaccineMonthlyUsage: Record<string, {
            month: string
            value: number
        }[]>
    }

    const { vaccines_total, request_total, barangay_total, low_stocks_total, vaccineMonthlyUsage, vaccines } = usePage<PageProps>().props

    const totalVaccine = vaccines_total;
    const totalBarangay = barangay_total;
    const totalRequest = request_total;
    const totalLowStockAlert = low_stocks_total;

    const [selectedVaccine, setSelectedVaccine] = useState(Object.keys(vaccineMonthlyUsage)[0])
    console.log(vaccineMonthlyUsage);

    const chartData =
        vaccineMonthlyUsage?.[selectedVaccine] ?? []


    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 px-6">
                <div className='space-y-4'>
                    <div >
                        <div className='mb-2'>
                            <Label className='text-md flex items-center'>Dashboard</Label>
                            <span className="text-sm text-muted-foreground">
                                Overview of vaccination data and statistics.
                            </span>
                        </div>

                        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <SectionCards total={totalVaccine} title={'Total Vaccines'} description={`Total number of vaccines`}></SectionCards>
                            <SectionCards total={totalBarangay} title={'Total Registry Barangay'} description={`Total number of barangays in the registry`}></SectionCards>
                            <SectionCards total={totalRequest} title={'Total Requests/Returns'} description={`Total number of vaccine requests adn return from barangays`}></SectionCards>
                            <SectionCards total={totalLowStockAlert} title={'Total Low Stocks'} description={`Total number of stock alerts`}></SectionCards>
                        </div>
                    </div>
                    <div className="grid gap-4 auto-rows-min lg:grid-cols-3 grid-cols-1 ">


                        <div className='col-span-1 lg:col-span-3'>
                            <ChartAreaDefault
                                data={chartData}
                                selectedVaccine={selectedVaccine}
                                vaccines={Object.keys(vaccineMonthlyUsage)}
                                onSelectVaccine={setSelectedVaccine} />
                        </div>

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
