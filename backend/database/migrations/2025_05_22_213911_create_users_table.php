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
            $table->id();

            // Фамилия
            $table->string('last_name');

            // Имя
            $table->string('first_name');

            // Отчество (его может не быть, назвали middle_name вроды бы так принято)
            $table->string('middle_name')->nullable();

            // Номер телефона (уникальный)
            $table->string('phone')->unique();

            // Email (уникальный)
            $table->string('email')->unique();

            // Для авторизации, можно хранить пароль
            $table->string('password');

            // Для сброса пароля, токен запоминания сессии
            $table->rememberToken();

            // Метки времени created_at и updated_at
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
