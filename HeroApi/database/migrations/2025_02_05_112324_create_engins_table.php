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
        Schema::create('engin', function (Blueprint $table) {

            $table->foreignUuid('EnginTypeUuid')->references('EnginTypeUuid')->on('enginType')->nullable(false);

            $table->foreignUuid('SuperHeroUuid')->references('SuperHeroUuid')->on('superHero')->nullable(false);

            $table->string('EnginName')->nullable(false);
            
            $table->longText('EnginDescription');

            $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('engin');
    }
};
