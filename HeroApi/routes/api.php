<?php

use App\Http\Controllers\UsersController;

use App\Http\Controllers\PlanetController;

use App\Http\Controllers\EnginController;

use App\Http\Controllers\EnginTypeController;

Route::apiResource('users', UsersController::class);

Route::apiResource('planet', PlanetController::class);

Route::apiResource('engin', EnginController::class);

Route::apiResource('engintype', EnginTypeController::class);