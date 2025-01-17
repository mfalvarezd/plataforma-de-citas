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
}
