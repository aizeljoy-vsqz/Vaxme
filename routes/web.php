<?php

use App\Http\Controllers\DailyVaccineController;
use App\Http\Controllers\VaccineBatchesController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/vaccineInventory', [VaccineBatchesController::class, 'Index'])->name('batchesVaccineInventory');
    Route::get('/dailyVaccineInventory', [DailyVaccineController::class, 'Index'])->name('dailyVaccineInventory');
});

require __DIR__.'/settings.php';
