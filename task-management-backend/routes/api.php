<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\TaskController;
use App\Http\Controllers\Api\V1\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/tasks', [TaskController::class, 'index']);
        Route::post('/task', [TaskController::class, 'store']);
        Route::put('/task/{id}', [TaskController::class, 'update']);
        Route::delete('/task/{id}', [TaskController::class, 'destroy']);
        Route::get('/tasks/{id}', [TaskController::class, 'show']);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/signup', [AuthController::class, 'signUp']);
        Route::post('/login', [AuthController::class, 'login']);
    });
});