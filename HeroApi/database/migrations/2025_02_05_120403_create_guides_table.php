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
        Schema::create('guide', function (Blueprint $table) {

             $table->foreignUuid('SuperHeroUuid')->references('SuperHeroUuid')->on('superHero')->nullable(false);

             $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->nullable(false);

             $table->longText('Weakness');

             $table->longText('Strength');

             $table->integer('Dengerousness');

             $table->longText('DestroyingPlan');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guide');
    }
};
