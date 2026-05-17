<?php

use App\Http\Controllers\RequestController;
use App\Http\Controllers\ReturnVaccineController;
use App\Http\Controllers\TrackVaccinationController;
use App\Http\Controllers\DailyBatchesInventoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VaccineBatchesController;
use App\Http\Controllers\VaccineManagementController;
use App\Http\Controllers\VaccineRequestController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');


Route::middleware(['auth', 'verified', 'user_type:rhu'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/dashboard',[DashboardController::class, 'Index'])->name('dashboard');
    Route::get('/vaccine/inventory', [VaccineBatchesController::class, 'Index'])->name('batchesVaccineInventory');
    Route::post('/vaccine/inventory/store', [VaccineBatchesController::class, 'Store'])->name('batchesVaccineInventory.store');
    Route::delete('/vaccine/inventory/delete/{delete_vaccine}', [VaccineBatchesController::class, 'Delete'])->name('batchesVaccineInventory.delete');
    Route::put('/vaccine/inventory/update/{update_batch_id}', [VaccineBatchesController::class, 'Update'])->name('batchesVaccineInventory.update');

    Route::get('/daily/vaccine/inventory/{id}', [DailyBatchesInventoryController::class, 'Index'])->name('dailyVaccineInventory');
    Route::post('/daily/vaccine/inventory/store', [DailyBatchesInventoryController::class, 'Store'])->name('dailyVaccineInventory.store');
    Route::delete('/daily/vaccine/inventory/delete/{daily_inventory_id}', [DailyBatchesInventoryController::class, 'Delete'])->name('dailyVaccineInventory.delete');
    Route::put('/daily/vaccine/inventory/update/{update_daily_inventory}', [DailyBatchesInventoryController::class, 'Update'])->name('dailyVaccineInventory.update');

    Route::get('/vaccine/management', [VaccineManagementController::class, 'Index'])->name('vaccineManagement');
    Route::post('/vaccine/management/store', [VaccineManagementController::class, 'Store'])->name('vaccineManagement.store');
    Route::delete('/vaccine/management/delete/{delete_vaccine_id}', [VaccineManagementController::class, 'Delete'])->name('vaccineManagement.delete');
    Route::put('/vaccine/management/update/{update_vaccine_id}', [VaccineManagementController::class, 'Update'])->name('vaccineManagement.delete');

    Route::get('/vaccine/request', [VaccineRequestController::class, 'Index'])->name('vaccineRequest');
});

Route::middleware(['auth', 'verified', 'user_type:bhc'])->group(function () {
    Route::inertia('bhc/dashboard', 'bhu_module/request_vaccine')->name('bhc.dashboard');
    Route::get('bhc/return/vaccines', [ReturnVaccineController::class, 'index'])->name('return.vaccine');
    Route::post('bhc/return/vaccines/store', [ReturnVaccineController::class, 'store'])->name('return.vaccine.store');
    Route::get('bhc/track/vaccination', [TrackVaccinationController::class, 'index'])->name('track.vaccination');
    Route::inertia('bhc/history/vaccination', 'bhu_module/history_vaccination')->name('history.vaccination');
    Route::post('/request/vaccine', [RequestController::class, 'addRequest'])->name('request.vaccine');
    Route::put('/request/{request}/vaccination-status', [TrackVaccinationController::class, 'updateVaccinationStatus'])->name('request.vaccination.status');
});

require __DIR__.'/settings.php';
