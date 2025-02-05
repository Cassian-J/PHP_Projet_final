<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('superPower', function (Blueprint $table) {
            $table->uuid('SuperPowerUuid')->primary()->unique()->nullable(false);

            $table->string('SuperPowerName')->nullable(false);

            $table->longText('SuperPowerDescription')->nullable(false);

            $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('superPower');
    }
};
