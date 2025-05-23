<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('ru_RU');

        for ($i = 0; $i < 1000; $i++) {
            User::create([
                'last_name'   => $faker->lastName,
                'first_name'  => $faker->firstName,
                'middle_name' => $faker->middleName,
                'phone'       => $faker->unique()->phoneNumber,
                'email'       => $faker->unique()->safeEmail,
                'password'    => Hash::make('password'), // пароль по умолчанию
                'remember_token' => Str::random(10),
            ]);
        }

        // Добавляем еще одного пользователя с всегда известным email, чтобы всегда был доступ для теста
        User::create([
            'last_name'   => $faker->lastName,
            'first_name'  => $faker->firstName,
            'middle_name' => $faker->middleName,
            'phone'       => $faker->unique()->phoneNumber,
            'email'       => 'testUserEmail@gmail.com',
            'password'    => Hash::make('password'), // пароль по умолчанию
            'remember_token' => Str::random(10),
        ]);
    }
}
