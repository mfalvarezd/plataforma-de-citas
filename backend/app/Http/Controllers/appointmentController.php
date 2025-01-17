<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;

class appointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::all();
        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No hay citas registradas',"status"=>400], 404);
        }
        return response()->json($appointments, 200);
    }
}
