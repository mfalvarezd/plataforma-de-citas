<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\availabilityController;
use App\Http\Controllers\appointmentController;
use App\Http\Controllers\serviceController;
use App\Http\Controllers\contractController;
use App\Http\Controllers\userController;
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
Route::get('/appointments', [appointmentController::class,'index']);
//falta agregar las rutas restantes
//crud appointments fin

//crud service inicio
Route::get('/services', [serviceController::class, 'index']);
Route::get('/services/{id}', [serviceController::class, 'show']);
Route::post('/services', [serviceController::class, 'store']);
Route::put('/services/{id}', [serviceController::class, 'update']);
Route::delete('/services/{id}', [serviceController::class, 'destroy']);
//crud service fin

//crud contracts inicio
Route::get('/contracts', [contractController::class,'index']);
//falta agregar las rutas restantes
//crud contracts fin




