<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
use Illuminate\Support\Facades\Validator;

class contractController extends Controller
{
    /**
     * Listar todos los contratos.
     */
    public function index()
    {
        $contracts = Contract::with(['client', 'freelancer'])->get();
        
        if ($contracts->isEmpty()) {
            return response()->json(['message' => 'No hay contratos registrados', 'status' => 400], 404);
        }
        
        return response()->json($contracts, 200);
    }

    /**
     * Crear un nuevo contrato.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_id' => 'required|exists:services,id',
            'client_id' => 'required|exists:users,id',
            'freelancer_id' => 'required|exists:users,id',
            'status' => 'required|string|in:pending,active,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $contract = Contract::create($request->all());

        return response()->json([
            'message' => 'Contrato creado exitosamente',
            'contract' => $contract,
            'status' => 201
        ], 201);
    }

    /**
     * Mostrar un contrato específico.
     */
    public function show($id)
    {
        $contract = Contract::with(['client', 'freelancer'])->find($id);

        if (!$contract) {
            return response()->json(['message' => 'Contrato no encontrado', 'status' => 404], 404);
        }

        return response()->json($contract, 200);
    }

    /**
     * Actualizar un contrato existente.
     */
    public function update(Request $request, $id)
    {
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json(['message' => 'Contrato no encontrado', 'status' => 404], 404);
        }

        $validator = Validator::make($request->all(), [
            'service_id' => 'sometimes|exists:services,id',
            'client_id' => 'sometimes|exists:users,id',
            'freelancer_id' => 'sometimes|exists:users,id',
            'status' => 'sometimes|string|in:pending,active,completed,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        $contract->update($request->all());

        return response()->json([
            'message' => 'Contrato actualizado exitosamente',
            'contract' => $contract,
            'status' => 200
        ], 200);
    }

    /**
     * Eliminar un contrato.
     */
    public function destroy($id)
    {
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json(['message' => 'Contrato no encontrado', 'status' => 404], 404);
        }

        $contract->delete();

        return response()->json(['message' => 'Contrato eliminado correctamente', 'status' => 200], 200);
    }
}
