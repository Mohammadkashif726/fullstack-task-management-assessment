<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Returns a list of clients
Route::get('/clients', [ClientController::class, 'index']);

//Returns a single client
Route::get('/clients/{client}', [ClientController::class, 'show']);

//Create a Project
Route::get('/projects', [ProjectController::class, 'index']);
Route::post('/project', [ProjectController::class, 'create']);

// Returns a list of Tasks
Route::get('/tasks', [TaskController::class, 'index']);

//Create a Task
Route::post('/task', [TaskController::class, 'create']);

//Update Status of Task
Route::patch('/tasks/{task}', [TaskController::class, 'updateStatus']);
