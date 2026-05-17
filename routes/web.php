<?php

use App\Http\Controllers\Auth\FirstLoginPasswordController;
use App\Http\Controllers\DailyBatchesInventoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Registrations\BarangayDetails_Controller;
use App\Http\Controllers\Registrations\Registration_Controller;
use App\Http\Controllers\VaccineBatchesController;
use App\Http\Controllers\VaccineManagementController;
use App\Http\Controllers\VaccineRequestController;
use App\Http\Middleware\ForcePasswordChange;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/first-login/change-password', [FirstLoginPasswordController::class, 'show']);
    Route::post('/first-login/change-password', [FirstLoginPasswordController::class, 'update']);
});

Route::middleware(['auth', ForcePasswordChange::class, 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'Index'])->name('dashboard');

    Route::get('/vaccine/inventory', [VaccineBatchesController::class, 'Index'])->name('batchesVaccineInventory');
    Route::post('/vaccine/inventory/store', [VaccineBatchesController::class, 'Store'])->name('batchesVaccineInventory.store');
    Route::delete('/vaccine/inventory/delete/{delete_vaccine}', [VaccineBatchesController::class, 'Delete'])->name('batchesVaccineInventory.delete');
    Route::put('/vaccine/inventory/update/{update_batch_id}', [VaccineBatchesController::class, 'Update'])->name('batchesVaccineInventory.update');

    Route::get('/daily/vaccine/inventory/{id}', [DailyBatchesInventoryController::class, 'Index'])->name('dailyVaccineInventory');
    Route::post('/daily/vaccine/inventory/store', [DailyBatchesInventoryController::class, 'Store'])->name('dailyVaccineInventory.store');
    Route::delete('/daily/vaccine/inventory/delete/{daily_inventory_id}', [DailyBatchesInventoryController::class, 'Delete'])->name('dailyVaccineInventory.delete');
    Route::put('/daily/vaccine/inventory/update/{update_daily_inventory}', [DailyBatchesInventoryController::class, 'Update'])->name('dailyVaccineInventory.update');

    Route::get('/vaccine/management', [VaccineManagementController::class, 'Index'])->name('vaccineManagement');
    Route::post('/vaccine/management/store', [VaccineManagementController::class, 'Store'])->name('vaccineManagement.store');
    Route::delete('/vaccine/management/delete/{delete_vaccine_id}', [VaccineManagementController::class, 'Delete'])->name('vaccineManagement.delete');
    Route::put('/vaccine/management/update/{update_vaccine_id}', [VaccineManagementController::class, 'Update'])->name('vaccineManagement.delete');

    Route::get('/vaccine/request', [VaccineRequestController::class, 'Index'])->name('vaccineRequest');

    Route::get('/registration', [Registration_Controller::class, 'index'])
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

    Route::post('/registration/population', [Registration_Controller::class, 'storePopulation'])
        ->name('registration.population.store');

    Route::delete('/registration/population/{population}', [Registration_Controller::class, 'destroyPopulation'])
        ->name('registration.population.destroy');

    Route::put('/registration/population/{population}', [BarangayDetails_Controller::class, 'updatePopulation'])
        ->name('registration.population.update');

    Route::get('/registration/brgy-details', [BarangayDetails_Controller::class, 'index'])
        ->name('registration.brgy-details');

    Route::inertia('notifications', 'Notifications/NotificationPage')
        ->name('notifications.page');

    Route::get('/api/notifications', [NotificationController::class, 'index'])
        ->name('notifications.index');

    Route::patch('/api/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])
        ->name('notifications.mark-all-read');

    Route::patch('/api/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])
        ->name('notifications.read');
});

require __DIR__.'/settings.php';
