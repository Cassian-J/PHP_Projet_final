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
        Schema::create('superHero', function (Blueprint $table) {

            $table->uuid('SuperHeroUuid')->primary()->unique()->nullable(false);

            $table->string('SuperHeroName')->nullable(false);

            $table->string('SuperHeroSex')->nullable(false);

            $table->foreignUuid('HomePlanetUuid')->references('PlanetUuid')->on('planet')->nullable(false);

            $table->timestamps();

            $table->longText('SuperHeroDescription');

            $table->foreignUuid('ProtectedCityUuid')->references('CityUuid')->on('city')->nullable();

            $table->foreignUuid('SquadUuid')->references('SquadUuid')->on('squad')->nullable();

            $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->onDelete('cascade')->nullable(false);



        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('superHero');
    }
};
