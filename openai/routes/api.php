<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/test', [App\Http\Controllers\Controller::class, 'test']);

Route::any('/send_bot', [App\Http\Controllers\Controller::class, 'send_bot'])->middleware(['throttle:100,5']);
Route::post('/get_message', [App\Http\Controllers\Controller::class, 'get_message']);
Route::post('/check_message', [App\Http\Controllers\Controller::class, 'c_message']);
Route::post('/searchs', [App\Http\Controllers\Controller::class, 'searchs']);
Route::post('/del_msg', [App\Http\Controllers\Controller::class, 'del_msg']);
Route::post('/get_vip_level', [App\Http\Controllers\Controller::class, 'get_vip_level']);
Route::post('/ai_draw', [App\Http\Controllers\Controller::class, 'ai_draw']);
Route::post('/send_draw', [App\Http\Controllers\Controller::class, 'send_draw']);
Route::post('/ai_draw_openai', [App\Http\Controllers\Controller::class, 'ai_draw_openai']);
Route::post('/get_me_draw', [App\Http\Controllers\Controller::class, 'get_me_draw']);
Route::post('/send_public', [App\Http\Controllers\Controller::class, 'send_public']);
Route::post('/kami_check', [App\Http\Controllers\Controller::class, 'kami_check']);
Route::post('/get_setting', [App\Http\Controllers\Controller::class, 'get_setting']);

//update user_info
Route::post('/login', [App\Http\Controllers\AuthorizationsController::class, 'login']);
Route::post('/web_login', [App\Http\Controllers\AuthorizationsController::class, 'web_login']);
Route::post('/register', [App\Http\Controllers\AuthorizationsController::class, 'register']);
Route::post('/update_user', [App\Http\Controllers\AuthorizationsController::class, 'update_user']);
Route::post('/get_user', [App\Http\Controllers\AuthorizationsController::class, 'get_user']);
Route::post('/invite_code', [App\Http\Controllers\AuthorizationsController::class, 'invite_code']);
Route::post('/upload_avatar', [App\Http\Controllers\Controller::class, 'upload_avatar']);


Route::post('/change_password', [App\Http\Controllers\AuthorizationsController::class, 'change_password']);
Route::post('/send_email', [App\Http\Controllers\AuthorizationsController::class, 'sendEmailCode']);
Route::post('/reset_password', [App\Http\Controllers\AuthorizationsController::class, 'reset_password']);
//end
Route::post('/socials/wechat', [App\Http\Controllers\AuthorizationsController::class, 'socialStore'])->name('api.socials.authorizations.store'); // 第三方登录
Route::get('/weixin_callback',  [App\Http\Controllers\AuthorizationsController::class, 'weixin_callback']);

//pay
Route::post('/alipay', [App\Http\Controllers\PayController::class, 'alipay']);
Route::any('/alipay_return', [App\Http\Controllers\PayController::class, 'alipay_return']);
Route::any('/alipay_notify', [App\Http\Controllers\PayController::class, 'alipay_notify']);

Route::post('/wechat', [App\Http\Controllers\PayController::class, 'wechat_pay']);
Route::any('/wechat_return', [App\Http\Controllers\PayController::class, 'wechat_return']);
Route::any('/wechat_notify', [App\Http\Controllers\PayController::class, 'wechat_notify']);


//backend api
Route::post('/admin_login', [App\Http\Controllers\AdminController::class, 'admin_login']);
