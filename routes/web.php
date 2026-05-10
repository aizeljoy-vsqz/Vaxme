<?php

use App\Http\Controllers\DailyBatchesInventoryController;
use App\Http\Controllers\VaccineBatchesController;
use App\Http\Controllers\VaccineManagementController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/vaccine/inventory', [VaccineBatchesController::class, 'Index'])->name('batchesVaccineInventory');
    Route::post('/vaccine/inventory/store', [VaccineBatchesController::class, 'Store'])->name('batchesVaccineInventory.store');
    Route::delete('/vaccine/inventory/delete/{delete_vaccine}', [VaccineBatchesController::class, 'Delete'])->name('batchesVaccineInventory.delete');

    Route::get('/daily/vaccine/inventory/{id}', [DailyBatchesInventoryController::class, 'Index'])->name('dailyVaccineInventory');
    Route::post('/daily/vaccine/inventory/store', [DailyBatchesInventoryController::class, 'Store'])->name('dailyVaccineInventory.store');
    Route::delete('/daily/vaccine/inventory/delete/{daily_inventory_id}', [DailyBatchesInventoryController::class, 'Delete'])->name('dailyVaccineInventory.delete');

    Route::get('/vaccine/management', [VaccineManagementController::class, 'Index'])->name('vaccineManagement');
    Route::post('/vaccine/management/store', [VaccineManagementController::class, 'Store'])->name('vaccineManagement.store');
    Route::delete('/vaccine/management/delete/{delete_vaccine_id}', [VaccineManagementController::class, 'Delete'])->name('vaccineManagement.delete');
});

require __DIR__.'/settings.php';
