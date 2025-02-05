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
        Schema::create('planet', function (Blueprint $table) {

            $table->uuid('PlanetUuid')->primary()->unique()->nullable(false);

            $table->string('PlanetName')->nullable(false);

            $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planet');
    }
};
