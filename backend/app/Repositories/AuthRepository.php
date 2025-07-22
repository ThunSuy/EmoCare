<?php

namespace App\Repositories;

use App\Mail\PasscodeMail;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Support\Facades\Mail;


class AuthRepository implements AuthRepositoryInterface
{
    public function findOrCreateUserByGoogle($googleUser)
    {
        return User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            ['name' => $googleUser->getName()]
        );
    }

    public function sendLoginCode($email, $code)
    {
        EmailVerification::updateOrCreate(
            ['email' => $email],
            ['code' => $code, 'created_at' => now()]
        );
        Mail::to($email)->send(new PasscodeMail($code));
    }

    public function verifyLoginCode($email, $code)
    {
        return EmailVerification::where('email', $email)
            ->where('code', $code)
            ->where('created_at', '>=', now()->subMinutes(10))
            ->first();
    }

    public function logout($user)
    {
        $user->currentAccessToken()->delete();
    }
}
