<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Super_Power_Super_Hero;

class SuperPower_SuperHeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $superPower_superHero = Super_Power_Super_Hero::all();
        return response()->json($superPower_superHero);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $superPower_superHero = Super_Power_Super_Hero::create($request->all());
        return response()->json($superPower_superHero, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $superPower_superHero  = Super_Power_Super_Hero::find($id);
        if (!$superPower_superHero ) {
            return response()->json(['message' => 'bound not found'], 404);
        }
        return response()->json($superPower_superHero );
    }
}
