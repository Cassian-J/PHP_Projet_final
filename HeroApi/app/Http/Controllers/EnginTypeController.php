<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnginTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $engintype = EnginType::all();
        return response()->json($engintype);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $engintype = EnginType::create($request->all());
        return response()->json($engintype, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $engintype = EnginType::find($id);
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
        $engintype = EnginType::find($id);
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
        $engintype = EnginType::find($id);
        if (!$engintype) {
            return response()->json(['message' => 'EnginType not found'], 404);
        }
        $engintype->delete();
        return response()->json(['message' => 'EnginType sucefuly supresed']);
    }
}
