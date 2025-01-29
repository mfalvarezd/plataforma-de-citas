<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No hay usuarios registrados', "status" => 400], 404);
        }
        return response()->json($users, 200);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado', "status" => 404], 404);
        }
        return response()->json($user, 200);

    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:10',
            'role' => 'required|string|in:cliente,freelancer', // Validar el campo 'role'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => $request->role, // Guardar el campo 'role'
        ]);

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'user' => $user,
            'status' => 201,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'phone' => 'nullable|string|max:15',
            'role' => 'sometimes|required|string|in:cliente,freelancer', // Validar el campo 'role'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validacion de datos',
                'errors' => $validator->errors(),
                'status' => 400,
            ], 400);
        }

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($request->has('phone')) {
            $user->phone = $request->phone;
        }
        if ($request->has('role')) {
            $user->role = $request->role;
        }

        $user->save();

        return response()->json(['message' => 'Usuario actualizado correctamente', 'user' => $user, 'status' => 200], 200);

    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente', 'status' => 200], 200);
    }
    public function login(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:6',
        ]);

        // Buscar el usuario por nombre de usuario o email
        $user = User::where('email', $request->email)->first();

        // Verificar si el usuario existe y si la contraseña es correcta
        if ($user && Hash::check($request->password, $user->password)) {
            // Las credenciales son válidas, el usuario ha sido autenticado
            return response()->json(['message' => 'Autenticado correctamente'], 200);
        }

        // Si las credenciales no son correctas
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }
    public function showByEmail($email)
    {
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado', 'status' => 404], 404);
        }
        return response()->json($user, 200);
    }


}
