<?php
    use App\Http\Controllers\Registration\Registration_Controller;
    use App\Http\Controllers\Inventoryy\Inventory_controller;
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

    Route::get('/inventory',[Inventory_controller::class, 'index'])
    ->name('inventory');


require __DIR__.'/settings.php';
