<?php

use App\Http\Controllers\DailyVaccineController;
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
    Route::get('/daily/vaccine/inventory', [DailyVaccineController::class, 'Index'])->name('dailyVaccineInventory');
    Route::get('/vaccine/management', [VaccineManagementController::class, 'Index'])->name('vaccineManagement');
});

require __DIR__.'/settings.php';
