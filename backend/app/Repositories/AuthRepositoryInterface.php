<?php

namespace App\Repositories;

interface AuthRepositoryInterface
{
    public function findOrCreateUserByGoogle($googleUser);
    public function sendLoginCode($email, $code);
    public function verifyLoginCode($email, $code);
    public function logout($user);
}
