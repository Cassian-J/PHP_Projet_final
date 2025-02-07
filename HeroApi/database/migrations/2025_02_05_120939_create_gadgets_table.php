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
        Schema::create('gadget', function (Blueprint $table) {

            $table->uuid('GadgetUuid')->primary()->unique()->nullable(false);

            $table->foreignUuid('SuperHeroUuid')->references('SuperHeroUuid')->on('superHero')->onDelete('cascade')->nullable(false);

            $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->onDelete('cascade')->nullable(false);

            $table->string('GadgetName')->nullable(false);

            $table->longText('GadgetDescription')->nullable(false);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gadget');
    }
};
