<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\availabilityController;
use App\Http\Controllers\appointmentController;
use App\Http\Controllers\serviceController;
use App\Http\Controllers\contractController;
use App\Http\Controllers\userController;
use App\Http\Controllers\ReminderController;

//crud usuarios inicio
Route::get('/users',[userController::class,'index'] );
Route::get('/users/{id}', [userController::class, 'show']);
Route::post('/users', [userController::class, 'store']);
Route::put('/users/{id}', [userController::class, 'update']);
Route::delete('/users/{id}', [userController::class, 'destroy']);

/*Route::get('/users/{id}', function($id){
    return response()->json([
        'usuario' => ['usuarioid' => $id,
        ]
    ]);
});
Route::post('/users', function(){
    return response()->json([
        'mensaje' => 'usuario creado'
    ], 201);
});
Route::put('/users/{id}', function($id){
    return response()->json([
        'mensaje' => 'usuario actualizado'
    ]);
});
Route::delete('/users/{id}', function($id){
    return response()->json([
        'mensaje' => 'usuario eliminado'
    ]);
});*/

//crud usuarios fin

//crud availabilities inicio
Route::get('/availabilities', [availabilityController::class, 'index']);
Route::get('/availabilities/{id}', [availabilityController::class, 'show']);
Route::post('/availabilities', [availabilityController::class, 'store']);
Route::put('availabilities/{id}', [availabilityController::class, 'update']);
Route::patch('/availabilities/{id}', [availabilityController::class, 'updatePartial']);
Route::delete('/availabilities/{id}', [availabilityController::class, 'destroy']);

//crud availabilities fin

//crud appointments inicio

Route::get('/appointments', [AppointmentController::class, 'index']); // Listar todas las citas
Route::post('/appointments', [AppointmentController::class, 'store']); // Crear una nueva cita
Route::put('/appointments/{id}/cancel', [AppointmentController::class, 'cancel']); // Cancelar una cita
Route::get('/appointments/filter-by-date', [AppointmentController::class, 'filterByDate']); // Filtrar citas por fecha
Route::get('/appointments/filter-by-client', [AppointmentController::class, 'filterByClient']); // Filtrar citas por cliente
Route::get('/appointments/filter-by-status', [AppointmentController::class, 'filterByStatus']); // Filtrar citas por estado

//crud appointments fin

//crud service inicio
Route::get('/services', [serviceController::class, 'index']);
Route::get('/services/{id}', [serviceController::class, 'show']);
Route::post('/services', [serviceController::class, 'store']);
Route::put('/services/{id}', [serviceController::class, 'update']);
Route::delete('/services/{id}', [serviceController::class, 'destroy']);
//crud service fin

//crud contracts inicio
Route::get('/contracts', [contractController::class,'index']); // Listar todos los contratos
Route::get('/contracts/{id}', [contractController::class, 'show']); // Mostrar un contrato específico
Route::post('/contracts', [contractController::class, 'store']); // Crear un nuevo contrato
Route::put('/contracts/{id}', [contractController::class, 'update']); // Actualizar un contrato
Route::delete('/contracts/{id}', [contractController::class, 'destroy']); // Eliminar un contrato


//crud contracts fin

//crud reminders inicio
Route::post('/reminders/send', [reminderController::class, 'sendReminders']);

//crud reminders fin




