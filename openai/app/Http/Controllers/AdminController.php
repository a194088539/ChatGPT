<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/3   15:06
 */

namespace App\Http\Controllers;


use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function admin_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|exists:admin',
            'password' => 'required',
        ], [
            'username.required' => '账号必须填写',
            'username.exists' => '账号不存在',
            'password.required' => '密码必须填写',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first(),'status'=>401], 401);
        }

        $credentials = $request->only('username', 'password');

        $admin_user = Admin::where('username', $request->username)
            ->firstOrFail();

        if (!Hash::check($request->password, $admin_user->password)) {
            return response()->json(['message' => '账号或密码错误','status'=>401], 401);
        }
        $token = $admin_user->createToken('auth_token')->accessToken;
        return response()->json(['datas' => $token,'message'=>'登录成功','status'=>200], 200);


    }

    public function admin_logout(Request $request)
    {
        $user_id =  auth()->guard('admin')->user();
        return response()->json(['message'=>'退出成功','status'=>200], 200);
    }

    public function admin_info(Request $request)
    {
        $user_id =  auth()->guard('admin')->user();
        $admin_user = Admin::where('id', $user_id->id)
            ->firstOrFail();

        return response()->json(['data' => $admin_user,'message'=>'获取成功','status'=>200], 200);
    }

}
