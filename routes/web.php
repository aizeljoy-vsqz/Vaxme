<?php
    	use App\Http\Controllers\Registrations\BarangayDetails_Controller;
    use App\Http\Controllers\Registrations\Registration_Controller;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Middleware\ForcePasswordChange;
use App\Http\Controllers\Auth\FirstLoginPasswordController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// First-login change password routes (authenticated only)
Route::middleware(['auth'])->group(function () {
    Route::get('/first-login/change-password', [FirstLoginPasswordController::class, 'show']);
    Route::post('/first-login/change-password', [FirstLoginPasswordController::class, 'update']);
});

Route::middleware(['auth', ForcePasswordChange::class, 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/registration',[Registration_Controller::class, 'index'])
        ->name('registration');

    Route::get('/registration/search', [Registration_Controller::class, 'search'])
        ->name('registration.search');

    Route::post('/registration', [Registration_Controller::class, 'store'])
    ->name('registration.store');

    Route::delete('/registration/{bhc}', [Registration_Controller::class, 'destroy'])
        ->name('registration.destroy');

    Route::put('/registration/{bhc}', [Registration_Controller::class, 'update'])
        ->name('registration.update');
        
    Route::get('/registration/export', [Registration_Controller::class, 'export'])
        ->name('registration.export');

    Route::post('/registration/population',[Registration_Controller::class, 'storePopulation'])
        ->name('registration.population.store');
    
    Route::delete('/registration/population/{population}', [Registration_Controller::class, 'destroyPopulation'])
        ->name('registration.population.destroy');

    Route::put('/registration/population/{population}',[BarangayDetails_Controller::class, 'updatePopulation'])
        ->name('registration.population.update');
    
    Route::get('/registration/brgy-details',[BarangayDetails_Controller::class, 'index'])
        ->name('registration.brgy-details');
});


require __DIR__.'/settings.php';
