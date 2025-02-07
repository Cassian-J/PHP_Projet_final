<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planet;

class PlanetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $planet = Planet::all();
        return response()->json($planet);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $planet = Planet::create($request->all());
        return response()->json($planet, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $planet = Planet::find($id);
        if (!$planet) {
            return response()->json(['message' => 'planet not found'], 404);
        }
        return response()->json($planet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $planet = Planet::find($id);
        if (!$planet) {
            return response()->json(['message' => 'Planet not found'], 404);
        }
        $planet->update($request->all());
        return response()->json($planet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $planet = Planet::find($id);
        if (!$planet) {
            return response()->json(['message' => 'Planet not found'], 404);
        }
        $planet->delete();
        return response()->json(['message' => 'Planet sucefuly supresed']);
    }
}
