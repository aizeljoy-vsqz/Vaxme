<?php

use App\Http\Controllers\VaccineBatchesController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('/vaccineInventory', [VaccineBatchesController::class, 'Index'])->name('vaccineInventory');
});

require __DIR__.'/settings.php';
