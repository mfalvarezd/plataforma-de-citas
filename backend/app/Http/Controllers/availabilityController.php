<?php

namespace App\Http\Controllers;
use App\Models\Availability;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class availabilityController extends Controller
{
    public function index()
    {
        $availabilities = Availability::all();
        if ($availabilities->isEmpty()) {
            return response()->json(['message' => 'No hay disponibilidades registradas',"status"=>400], 404);
        }
        return response()->json($availabilities, 200);
    }
    public function show($id){
        $availability = Availability::find($id);
        if ($availability == null) {
            return response()->json(['message' => 'Disponibilidad no encontrada',"status"=>400], 404);
        }
    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'freelancer_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'is_booked' => 'required|boolean'
        ]);

        if ($validator->fails()) {

            $data = ['message' => 'Error en la validacion de datos', 'errors' => $validator->errors(),'status' => 400];
            return response()->json($data, 400);
        }

        $availability = Availability::create([
            'freelancer_id' => $request->freelancer_id,
            'date' => $request->date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'is_booked' => $request->is_booked
        ]);
        if (!$availability) {
            return response()->json(['message' => 'Error al registrar la disponibilidad','status'=>500], 500);
        }
        $data = ['availability'=>$availability,
            'message' => 'Disponibilidad registrada correctamente',
            'status' => 201];
        return response()->json($data, 201);

    }

    public function update(Request $request, $id){
        $availability = Availability::find($id);
        if(!$availability){
            return response()->json(['message'=> 'Disponibilidad no encontrada','status'=> 404],404);
        }
        $validator = Validator::make($request->all(), [
            'freelancer_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'is_booked' => 'required|boolean'
        ]);

        if ($validator->fails()) {

            $data = ['message' => 'Error en la validacion de datos', 'errors' => $validator->errors(),'status' => 400];
            return response()->json($data, 400);
        }
        $availability->freelancer_id = $request->freelancer_id;
        $availability->date = $request->date;
        $availability->start_time = $request->start_time;
        $availability->end_time = $request->end_time;
        $availability->is_booked = $request->is_booked;
        $availability->save();
        return response()->json(['message'=> 'Disponibilidad actualizada','status'=> 200],200);

    }

    public function updatePartial(Request $request, $id){
        $availability = Availability::find($id);
        if(!$availability){
            return response()->json(['message'=> 'Disponibilidad no encontrada','status'=> 404],404);
        }
        $validator = Validator::make($request->all(), [
            'freelancer_id' => 'exists:users,id',
            'date' => 'date',
            'start_time' => 'date_format:H:i',
            'end_time' => 'date_format:H:i',
            'is_booked' => 'boolean'
        ]);

        if ($validator->fails()) {

            $data = ['message' => 'Error en la validacion de datos', 'errors' => $validator->errors(),'status' => 400];
            return response()->json($data, 400);
        }
        if($request->has('freelancer_id')){
            $availability->freelancer_id = $request->freelancer_id;
        }
        if($request->has('date')){
            $availability->date = $request->date;
        }
        if($request->has('start_time')){
            $availability->start_time = $request->start_time;
        }
        if($request->has('end_time')){
            $availability->end_time = $request->end_time;
        }
        if($request->has('is_booked')){
            $availability->is_booked = $request->is_booked;
        }
        $availability->save();
        return response()->json(['message'=> 'Disponibilidad actualizada','status'=> '200'],200);
    }
    public function destroy(Request $request, $id){
        $availability = Availability::find($id);
        if(!$availability){
            return response()->json(['message'=> 'Disponibilidad no encontrada','status'=> 404],404);
        }
        $availability->delete();
        return response()->json(['message'=> 'Disponibilidad eliminada correctamente','status'=> 200],200);
    }
}
