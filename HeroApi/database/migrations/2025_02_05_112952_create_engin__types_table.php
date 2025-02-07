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
        Schema::create('enginType', function (Blueprint $table) {

            $table->uuid('EnginTypeUuid')->primary()->unique()->nullable(false);

            $table->string('EnginTypeName')->nullable(false);

            $table->foreignUuid('UserUuid')->references('UserUuid')->on('users')->onDelete('cascade')->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enginType');
    }
};
