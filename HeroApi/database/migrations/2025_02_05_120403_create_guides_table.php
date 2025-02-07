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

             $table->foreignUuid('SuperHeroUuid')->references('SuperHeroUuid')->on('superHero')->onDelete('cascade')->nullable(false);

             $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->onDelete('cascade')->nullable(false);

             $table->longText('Weakness')->nullable(false);

             $table->longText('Strength')->nullable(false);

             $table->integer('Dengerousness')->nullable(false);

             $table->longText('DestroyingPlan')->nullable(false);

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
