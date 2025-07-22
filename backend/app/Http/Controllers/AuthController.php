<?php

namespace App\Http\Controllers;

use App\Mail\PasscodeMail;
use App\Models\EmailVerification;
use App\Models\User;
use App\Repositories\AuthRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    protected $authRepo;

    public function __construct(AuthRepositoryInterface $authRepo)
    {
        $this->authRepo = $authRepo;
    }

    // Login with google
    public function loginWithGoogle(Request $request)
    {
        $googleToken = $request->input('token');
        $googleUser = Socialite::driver('google')->stateless()->userFromToken($googleToken);
        $user = $this->authRepo->findOrCreateUserByGoogle($googleUser);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token]);
    }


    // Send login code to email
    public function sendLoginCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $code = rand(100000, 999999);
        $this->authRepo->sendLoginCode($request->email, $code);
        return response()->json(['message' => 'Code sent']);
    }

    public function verifyLoginCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|digits:6',
        ]);
        $verification = $this->authRepo->verifyLoginCode($request->email, $request->code);
        if (!$verification) {
            return response()->json(['message' => 'Invalid or expired code'], 401);
        }
        $user = User::firstOrCreate(
            ['email' => $request->email],
            ['name' => 'User_' . Str::random(5)]
        );
        $verification->delete();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $this->authRepo->logout($request->user());
        return response()->json(['message' => 'Logged out']);
    }
}
