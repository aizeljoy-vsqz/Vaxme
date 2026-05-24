<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\DailyBatchesInventory;

class DashboardController extends Controller
{
    public function Index(Request $request)
    {
        $user_current = $request->user();
        $rhu_current = $user_current->rhu;

        $vaccines_total = $rhu_current->vaccines()->count();
        $request_total = $rhu_current->requests()->count();
        $barangay_total = $rhu_current->bhcs()->count();
        $low_stocks_total = $rhu_current->vaccineBatches()
            ->where('current_balance', '<=', 100)
            ->count();
        // $total_stocks = $rhu_current->vaccineBatches->current_balance->count();

        $allUsage = DailyBatchesInventory::query()
            ->whereYear('created_at', now()->year)
            ->whereHas('vaccineBatch.vaccine')
            ->whereHas('vaccineBatch', function ($q) use ($rhu_current) {
                $q->where('rhu_id', $rhu_current->id);
            })
            ->with('vaccineBatch.vaccine')
            ->get();

        $monthTemplate = collect(range(1, 12))->mapWithKeys(function ($m) {
            return [
                Carbon::create()->month($m)->format('F') => 0
            ];
        });

        $vaccineNames = $rhu_current->vaccines->pluck('name');

        $structured = [];

        foreach ($vaccineNames as $name) {
            $structured[$name] = collect($monthTemplate)
                ->map(function ($value, $month) {
                    return [
                        'month' => $month,
                        'value' => 0
                    ];
                })
                ->values()
                ->toArray();
        }

        foreach ($allUsage as $record) {
            $vaccineName = $record->vaccineBatch->vaccine->name;
            $monthName = Carbon::parse($record->created_at)->format('F');

            foreach ($structured[$vaccineName] as &$row) {
                if ($row['month'] === $monthName) {
                    $row['value'] += $record->daily_dispense;
                    break;
                }
            }
        }

        $vaccineMonthlyUsage = $structured;

        return Inertia::render('dashboard', compact(['vaccines_total', 'request_total', 'barangay_total', 'low_stocks_total', 'vaccineMonthlyUsage']));
    }
}
