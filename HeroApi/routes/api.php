<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\Super_HeroController;
use Illuminate\Support\Facades\Route;

Route::apiResource('/users', UsersController::class);

Route::post('/users/store', [UsersController::class, 'store']); 

Route::put('/users/{id}/update', [UsersController::class, 'update']);

Route::delete('/users/{id}/destroy', [UsersController::class, 'destroy']);


Route::apiResource('/super_hero', Super_HeroController::class);

Route::post('/super_hero/store', [Super_HeroController::class, 'store']); 

Route::put('/super_hero/{id}/update', [Super_HeroController::class, 'update']);

Route::delete('/super_hero/{id}/destroy', [Super_HeroController::class, 'destroy']);
