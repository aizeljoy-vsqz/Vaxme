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
    Route::inertia('bhc/dashboard', 'bhu_module/bhu_dashboard')->name('bhc.dashboard');
});

require __DIR__.'/settings.php';
