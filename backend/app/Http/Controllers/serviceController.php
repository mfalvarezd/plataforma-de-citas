<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
class serviceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        if ($services->isEmpty()) {
            return response()->json(['message' => 'No hay servicios registrados',"status"=>400], 404);
        }
        return response()->json($services, 200);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'freelancer_id' => 'required|exists:users,id',
            'title' => 'required|string|max:150',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);

        $service = Service::create($validated);
    }

    public function show($id){
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado', "status" => 404], 404);
        }

        return response()->json($service, 200);
    }

    public function update(Request $request, $id){
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado', "status" => 404], 404);
        }

        $validated = $request->validate([
            'title' => 'nullable|string|max:150',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
        ]);

        $service->update($validated);

        return response()->json([
            'message' => 'Servicio actualizado exitosamente',
            'service' => $service,
        ], 200);
    }

    public function destroy($id){
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Servicio no encontrado', "status" => 404], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Servicio eliminado exitosamente'], 200);
    }

}
