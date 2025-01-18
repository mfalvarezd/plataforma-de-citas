<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Availability;

class appointmentController extends Controller
{
    // Ver listado de citas
    public function index()
    {
        $appointments = Appointment::with(['availability', 'client'])->paginate(10); // Incluye relaciones y paginación
        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No hay citas registradas', 'status' => 404], 404);
        }
        return response()->json($appointments, 200);
    }

    // Filtrar citas por fecha
    public function filterByDate(Request $request)
    {
        $date = $request->input('date');
        $appointments = Appointment::whereDate('created_at', $date)->with(['availability', 'client'])->get();

        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No hay citas para esta fecha', 'status' => 404], 404);
        }
        return response()->json($appointments, 200);
    }

    // Crear una cita
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'availability_id' => 'required|exists:availabilities,id',
            'client_id' => 'required|exists:users,id',
            'status' => 'required|string|in:pending,completed,cancelled',
        ]);

        // Validar que la disponibilidad no esté ya reservada
        $availability = Availability::findOrFail($validatedData['availability_id']);
        if ($availability->is_booked) {
            return response()->json(['message' => 'La disponibilidad ya está reservada', 'status' => 400], 400);
        }

        // Crear la cita
        $appointment = Appointment::create($validatedData);

        // Marcar la disponibilidad como reservada
        $availability->is_booked = true;
        $availability->save();

        return response()->json(['message' => 'Cita creada exitosamente', 'appointment' => $appointment], 201);
    }

    // Cancelar una cita
    public function cancel($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'cancelled';
        $appointment->save();

        // Liberar la disponibilidad asociada
        $availability = $appointment->availability;
        if ($availability) {
            $availability->is_booked = false;
            $availability->save();
        }

        return response()->json(['message' => 'Cita cancelada exitosamente'], 200);
    }

    // Filtrar citas por cliente
    public function filterByClient(Request $request)
    {
        $clientId = $request->input('client_id');
        $appointments = Appointment::where('client_id', $clientId)->with(['availability', 'client'])->get();

        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No hay citas para este cliente', 'status' => 404], 404);
        }
        return response()->json($appointments, 200);
    }

    // Filtrar citas por estado
    public function filterByStatus(Request $request)
    {
        $status = $request->input('status');
        $appointments = Appointment::where('status', $status)->with(['availability', 'client'])->get();

        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No hay citas con este estado', 'status' => 404], 404);
        }
        return response()->json($appointments, 200);
    }
}
