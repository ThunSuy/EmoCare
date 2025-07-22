<?php

namespace App\Providers;

use App\Repositories\AuthRepository;
use App\Repositories\AuthRepositoryInterface;
use App\Repositories\SelfTalkRepository;
use App\Repositories\SelfTalkRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SelfTalkRepositoryInterface::class, SelfTalkRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
    }


    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
