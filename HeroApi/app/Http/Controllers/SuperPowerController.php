<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Super_Power;

class SuperPowerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $superPower = Super_Power::all();
        return response()->json($superPower);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $superPower = Super_Power::create($request->all());
        return response()->json($superPower, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $superPower = Super_Power::find($id);
        if (!$superPower) {
            return response()->json(['message' => 'Super Power not found'], 404);
        }
        return response()->json($superPower);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $superPower = Super_Power::find($id);
        if (!$superPower) {
            return response()->json(['message' => 'Super Power not found'], 404);
        }
        $superPower->update($request->all());
        return response()->json($superPower);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $superPower = Super_Power::find($id);
        if (!$superPower) {
            return response()->json(['message' => 'Super Power not found'], 404);
        }
        $superPower->delete();
        return response()->json(['message' => 'Super Power sucefuly supresed']);
    }
}
