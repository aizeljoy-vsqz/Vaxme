<?php
    use App\Http\Controllers\Registration\Registration_Controller;
    use App\Http\Controllers\Registration\BarangayDetails_Controller;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

    Route::get('/registration',[Registration_Controller::class, 'index'])
        ->name('registration');

    Route::get('/registration/brgy-details',[BarangayDetails_Controller::class, 'index'])
        ->name('registration.brgy-details');

require __DIR__.'/settings.php';
