<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\Super_HeroController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UsersController::class);
Route::apiResource('super_hero', Super_HeroController::class);