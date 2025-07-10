<?php

namespace App\Http\Controllers;

use App\Mail\PasscodeMail;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Login with google
    public function loginWithGoogle(Request $request)
    {
        $googleToken = $request->input('token');

        $googleUser = Socialite::driver('google')->stateless()->userFromToken($googleToken);

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            ['name' => $googleUser->getName()]
        );

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }


    // Send login code to email
    public function sendLoginCode(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $code = rand(100000, 999999);

        EmailVerification::updateOrCreate(
            ['email' => $request->email],
            ['code' => $code, 'created_at' => now()]
        );

        Mail::to($request->email)->send(new PasscodeMail($code));

        return response()->json(['message' => 'Code sent']);
    }

    public function verifyLoginCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|digits:6',
        ]);

        // Log::info('Verify request', $request->only('email', 'code'));

        $verification = EmailVerification::where('email', $request->email)
            ->where('code', $request->code)
            ->where('created_at', '>=', now()->subMinutes(10))
            ->first();

        if (!$verification) {
            return response()->json(['message' => 'Invalid or expired code'], 401);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $user = User::create([
                'email' => $request->email,
                'name' => 'User_' . Str::random(5)
            ]);
        }


        $verification->delete();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token]);
    }
}
