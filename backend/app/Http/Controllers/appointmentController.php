<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;

class appointmentController extends Controller
{

    //Ver listado de citas
    public function index(Request $request)
    {
        $appointments = Appointment::query();

        if ($request->has('date')) {
            $appointments->whereDate('date', $request->input('date'));
        }

        if ($request->has('client_id')) {
            $appointments->where('client_id', $request->input('client_id'));
        }

        return response()->json($appointments->get(), 200);
    }

    //Cancelar una Cita
    public function cancel($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'cancelled';
        $appointment->save();

        // Enviar notificación (simulado)
        // Notification::send($appointment->client, new AppointmentCancelledNotification($appointment));

        return response()->json(['message' => 'Cita cancelada exitosamente'], 200);
    }

    
    //Crear Citas
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'availability_id' => 'required|exists:availabilities,id',
            'client_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'time' => 'required',
            'description' => 'nullable|string',
        ]);

        $appointment = Appointment::create($validatedData);

        return response()->json(['message' => 'Cita creada exitosamente', 'appointment' => $appointment], 201);
    }
}
