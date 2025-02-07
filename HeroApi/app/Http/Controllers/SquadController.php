<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Squad;

class SquadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $squad = Squad::all();
        return response()->json($squad);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $squad = Squad::create($request->all());
        return response()->json($squad, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $squad = Squad::find($id);
        if (!$squad) {
            return response()->json(['message' => 'Squad not found'], 404);
        }
        return response()->json($squad);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $squad = Squad::find($id);
        if (!$squad) {
            return response()->json(['message' => 'Squad not found'], 404);
        }
        $squad->update($request->all());
        return response()->json($squad);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $squad = Squad::find($id);
        if (!$squad) {
            return response()->json(['message' => 'Squad not found'], 404);
        }
        $squad->delete();
        return response()->json(['message' => 'Squad sucefuly supresed']);
    }
}
