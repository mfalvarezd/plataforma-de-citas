<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/usuarios', function(){
    return response()->json([
        'usuarios' => ['alexander mmv'
        ]
    ]);
});
