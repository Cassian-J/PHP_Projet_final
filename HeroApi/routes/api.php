<?php

use App\Http\Controllers\UsersController;
use App\Http\Controllers\SuperPowerController;
use App\Http\Controllers\GadgetController;
use App\Http\Controllers\SquadController;
use App\Http\Controllers\Super_HeroController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\PlanetController;
use App\Http\Controllers\EnginController;
use App\Http\Controllers\EnginTypeController;
use Illuminate\Support\Facades\Route;

Route::apiResource('gadget', GadgetController::class);

Route::apiResource('squad', SquadController::class);

Route::apiResource('users', UsersController::class);

Route::apiResource('super_power', SuperPowerController::class);

Route::apiResource('users', UsersController::class);

Route::apiResource('super_hero', Super_HeroController::class);

Route::apiResource('city', CityController::class);

Route::apiResource('guide', GuideController::class);

Route::apiResource('planet', PlanetController::class);

Route::apiResource('engin', EnginController::class);

Route::apiResource('engin_type', EnginTypeController::class);