<?php

use App\Http\Controllers\RequestController;
use App\Http\Controllers\ReturnVaccineController;
use App\Http\Controllers\TrackVaccinationController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified', 'user_type:rhu'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
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
