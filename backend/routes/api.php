<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Аутентификация
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Пользователи
Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::delete('/users/{id}', [UserController::class, 'destroy']);
Route::put('/users/{id}', [UserController::class, 'update']);

// Excel экспорты
Route::get('/users/export', function () {
    return Excel::download(new UsersExport, 'users.xlsx');
})->middleware('auth:sanctum');;
