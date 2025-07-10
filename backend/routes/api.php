<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Test API route
Route::get('/ping', function () {
    return response()->json(['message' => 'Pong! React đã gọi được API Laravel rồi 😎']);
});

// Login with google
Route::post('/auth/google', [AuthController::class, 'loginWithGoogle']);

// Login with email, passcode
Route::post('/auth/email/request', [AuthController::class, 'sendLoginCode']);
// Verify login code
Route::post('/auth/email/verify', [AuthController::class, 'verifyLoginCode']);
