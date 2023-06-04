<?php

use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

Route::group([
    'domain'     => config('admin.route.domain'),
    'prefix'     => config('admin.route.prefix'),
    'middleware' => config('admin.route.middleware'),
], function (Router $router) {

    $router->resource('dashboard', \App\Admin\Controllers\HomeController::class);

    $router->resource('system/settings', \App\Admin\Controllers\SettingController::class);
    $router->resource('users', \App\Admin\Controllers\UsersController::class);
    $router->resource('ai_qs', \App\Admin\Controllers\AiController::class);
    $router->resource('ai_draw', \App\Admin\Controllers\DrawController::class);
    $router->resource('orders', \App\Admin\Controllers\OrderController::class);
    $router->resource('vips', \App\Admin\Controllers\VipsController::class);
    $router->put('users/{user}/edit', [\App\Admin\Controllers\UsersController::class,'update']);
    $router->put('invite_setting/{user}/edit', [\App\Admin\Controllers\InviteSetController::class,'update']);
    $router->put('orders/{user}/edit', [\App\Admin\Controllers\OrderController::class,'update']);
    $router->put('card/{user}/edit', [\App\Admin\Controllers\CardController::class,'update']);

    $router->resource('invite_setting', \App\Admin\Controllers\InviteSetController::class);
    $router->resource('card', \App\Admin\Controllers\CardController::class);
    $router->resource('scence', \App\Admin\Controllers\SceneController::class);

    $router->resource('api/upload', \App\Admin\Controllers\UsersController::class);

});
