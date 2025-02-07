<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Engin_Type;
class EnginTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $engintype = Engin_Type::all();
        return response()->json($engintype);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $engintype = Engin_Type::create($request->all());
        return response()->json($engintype, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $engintype = Engin_Type::find($id);
        if (!$engintype) {
            return response()->json(['message' => 'engintype not found'], 404);
        }
        return response()->json($engintype);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $engintype = Engin_Type::find($id);
        if (!$engintype) {
            return response()->json(['message' => 'Engin not found'], 404);
        }
        $engintype->update($request->all());
        return response()->json($engintype);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $engintype = Engin_Type::find($id);
        if (!$engintype) {
            return response()->json(['message' => 'EnginType not found'], 404);
        }
        $engintype->delete();
        return response()->json(['message' => 'EnginType sucefuly supresed']);
    }
}
