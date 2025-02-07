<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnginController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $engin = Engin::all();
        return response()->json($engin);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $engin = Engin::create($request->all());
        return response()->json($engin, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $engin = Engin::find($id);
        if (!$engin) {
            return response()->json(['message' => 'engin not found'], 404);
        }
        return response()->json($engin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $engin = Engin::find($id);
        if (!$engin) {
            return response()->json(['message' => 'Engin not found'], 404);
        }
        $engin->update($request->all());
        return response()->json($engin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $engin = Engin::find($id);
        if (!$engin) {
            return response()->json(['message' => 'Engin not found'], 404);
        }
        $engin->delete();
        return response()->json(['message' => 'Engin sucefuly supresed']);
    }
}
