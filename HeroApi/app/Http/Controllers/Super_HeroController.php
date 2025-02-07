<?php

namespace App\Http\Controllers;

use App\Models\Super_Hero;
use Illuminate\Http\Request;

class Super_HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $superHero = Super_Hero::all();
        return response()->json($superHero);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $superHero = Super_Hero::create($request->all());
        return response()->json($superHero, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $superHero = Super_Hero::find($id);
        if (!$superHero) {
            return response()->json(['message' => 'Super_Hero not found'], 404);
        }
        return response()->json($superHero);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $superHero = Super_Hero::find($id);
        if (!$superHero) {
            return response()->json(['message' => 'Super_Hero not found'], 404);
        }
        $superHero->update($request->all());
        return response()->json($superHero);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $superHero = Super_Hero::find($id);
        if (!$superHero) {
            return response()->json(['message' => 'Super_Hero not found'], 404);
        }
        $superHero->delete();
        return response()->json(['message' => 'Super_Hero sucefuly supresed']);
    }
}
