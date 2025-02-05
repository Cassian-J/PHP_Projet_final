<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;

class UsersController extends Controller
{

    public function index()
    {
        $user = Users::all();
        return response()->json($user);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Users::create($request->all());
        return response()->json($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = Users::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Users::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->update($request->all());
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Users::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User sucefuly supresed']);
    }
}