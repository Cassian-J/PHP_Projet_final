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
        Schema::create('users', function (Blueprint $table) {

            $table->uuid('UserUuid')->primary()->unique()->nullable(false);

            $table->string('UserName')->nullable(false);

            $table->string('UserFirstName')->nullable(false);

            $table->string('UserPwd')->nullable(false);

            $table->string('UserMail')->nullable(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
