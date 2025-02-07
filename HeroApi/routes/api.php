<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\Super_HeroController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\GuideController;
use Illuminate\Support\Facades\Route;

Route::apiResource('users', UsersController::class);

Route::apiResource('super_hero', Super_HeroController::class);

Route::apiResource('city', CityController::class);

Route::apiResource('guide', GuideController::class);
