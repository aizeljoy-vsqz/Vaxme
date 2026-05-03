<?php
    	use App\Http\Controllers\Registrations\BarangayDetails_Controller;
    use App\Http\Controllers\Registrations\Registration_Controller;
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
    Route::post('/registration', [Registration_Controller::class, 'store'])
    ->name('registration.store');
    Route::put('/registration/{barangay}', [Registration_Controller::class, 'update'])
        ->name('registration.update');

    Route::post('/registration/population',[Registration_Controller::class, 'storePopulation'])
        ->name('registration.population.store');
    Route::put('/registration/population/{population}',[BarangayDetails_Controller::class, 'updatePopulation'])
        ->name('registration.population.update');
    
    Route::get('/registration/brgy-details',[BarangayDetails_Controller::class, 'index'])
        ->name('registration.brgy-details');


require __DIR__.'/settings.php';
