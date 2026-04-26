<?php

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
    Route::inertia('bhc/return/vaccines', 'bhu_module/return_vaccine')->name('return.vaccine');
    Route::inertia('bhc/track/vaccination', 'bhu_module/track_vaccination')->name('track.vaccination');
    Route::inertia('bhc/history/vaccination', 'bhu_module/history_vaccination')->name('history.vaccination');
});

require __DIR__.'/settings.php';
