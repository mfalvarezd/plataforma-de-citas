<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contract;
class contractController extends Controller
{
    public function index()
    {
        $contracts = Contract::all();
        if ($contracts->isEmpty()) {
            return response()->json(['message' => 'No hay contratos registrados',"status"=>400], 404);
        }
        return response()->json($contracts, 200);
    }
}
