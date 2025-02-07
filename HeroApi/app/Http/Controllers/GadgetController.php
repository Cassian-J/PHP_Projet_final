<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gadget;

class GadgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gadget = Gadget::all();
        return response()->json($gadget);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $gadget = Gadget::create($request->all());
        return response()->json($gadget, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $gadget = Gadget::find($id);
        if (!$gadget) {
            return response()->json(['message' => 'Gadget not found'], 404);
        }
        return response()->json($gadget);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $gadget = Gadget::find($id);
        if (!$gadget) {
            return response()->json(['message' => 'Gadget not found'], 404);
        }
        $gadget->update($request->all());
        return response()->json($gadget);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $gadget = Gadget::find($id);
        if (!$gadget) {
            return response()->json(['message' => 'Gadget not found'], 404);
        }
        $gadget->delete();
        return response()->json(['message' => 'Gadget sucefuly supresed']);
    }
}
