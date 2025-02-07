<?php

use App\Http\Controllers\UsersController;

use App\Http\Controllers\SuperPowerController;

use App\Http\Controllers\GadgetController;

use App\Http\Controllers\SquadController;

Route::apiResource('gadget', GadgetController::class);


Route::apiResource('squad', SquadController::class);


Route::apiResource('users', UsersController::class);

Route::apiResource('superPower', SuperPowerController::class);