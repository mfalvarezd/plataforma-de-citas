<?php 
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Models\Appointment;

class ReminderController extends Controller
{
    public function sendReminders()
    {
        $appointments = Appointment::where('status', 'confirmed')
            ->where('date', now()->addDay()->toDateString())
            ->get();

        foreach ($appointments as $appointment) {
            // Simular envío de correo
            Mail::raw("Recordatorio: tienes una cita el {$appointment->date} a las {$appointment->time}.", function ($message) use ($appointment) {
                $message->to($appointment->client->email)
                    ->subject('Recordatorio de Cita');
            });
        }

        return response()->json(['message' => 'Recordatorios enviados exitosamente'], 200);
    }
}

?>