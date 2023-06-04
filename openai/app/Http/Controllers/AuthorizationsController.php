<?php
namespace App\Http\Controllers;
use App\Models\Ai_draw;
use App\Models\Invite_meta;
use App\Models\InviteSet;
use App\Models\Message;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;
use App\Models\Order;
use App\Models\Vip;
use App\Models\Vip_meta;
class AuthorizationsController extends Controller {
    public function socialStore(Request $request) {
        return Socialite::driver('weixin')->redirect();
    }
    protected function respondWithToken($token) {
        return $this->success([
            'access_token' => 'Bearer ' . $token,
            'expires_in' => Auth::guard('api')->factory()->getTTL() ,
        ]);
    }

    public function weixin_callback()
    {
        $oauthUser = Socialite::with('weixin')->user();

        $data = [
            'nickname' => $oauthUser->getNickname(),
            'avatar'   => $oauthUser->getAvatar(),
            'open_id'  => $oauthUser->getId(),
            'sex'      => $oauthUser['sex'] == 1 ? '男' : '女',
        ];
        return $data;
    }

    public function login(Request $request){
        $code = $request->input('code');
        $userinfo = $request->input('userInfo');
        return response()->json(['data'=>$code,'userInfo'=>$userinfo,'status'=>200],200);
    }

    public function web_login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ], [
            'email.required' => '邮箱必须填写',
            'email.email' => '邮箱格式不正确',
            'email.exists' => '邮箱不存在',
            'password.required' => '密码必须填写',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first(),'status'=>401], 401);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->accessToken;

            return response()->json(['token' => $token,'user_info'=>$user,'message'=>'登录成功','status'=>200], 200);
        }

        return response()->json(['message' => '账号或密码错误','status'=>401], 401);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ], [
            'name.required' => '名字必须填写',
            'email.required' => '邮箱必须填写',
            'email.email' => '邮箱格式不正确',
            'email.unique' => '邮箱已经被注册',
            'password.required' => '密码必须填写',
            'password.min' => '密码不能少于6位',
        ]);
        $email = $request->input("email");
        $code = $request->input("email_code");
        $EMAIL_VERIFY_CODE = "email:verify:code:" . $email;//redis key
        $isCode = Redis::get($EMAIL_VERIFY_CODE);
        if ($isCode && $isCode == $email.$code) {
            Redis::del($EMAIL_VERIFY_CODE);
        }else{
            return response()->json(['message' => '验证码错误','status'=>401], 401);
        }


        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first(),'status'=>401], 401);
        }
        $invite_code = $this->getRandChar(6);
        $invite_code = strtoupper($invite_code);
        $set_money = Setting::where('option_name','REG_MONEY')->first()->option_value;
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'money' => $set_money,
            'invite_code' => $invite_code,
            'password' => Hash::make($request->password),
        ]);
        if ($request->invite_code){
            //拥有邀请码的人
            $invite_user = User::where('invite_code',$request->invite_code)->first();
            if ($invite_user){
                //邀请和被邀请的
                $invite_meta = new Invite_meta();
                $invite_meta->user_id = $user->id;
                $invite_meta->parent_id = $invite_user->id;
                $invite_meta->save();
                //判断次数是否达到
                $invite_setting = InviteSet::get();
                foreach($invite_setting as $item){
                    $invite_count = Invite_meta::where('parent_id',$invite_user->id)->count();
                    //判断当前用户的邀请人数是否达到设置的人数
                    if ($invite_count == $item->invite_c){
                        //给邀请人加钱
                        $pr_user = User::find($invite_user->id);
                        $pr_user->money = $pr_user->money + $item->invite_amount;
                        $pr_user->save();
                        //如果有设置会员，给邀请人加vip
                        if ($item->invite_vip_id!=0){
                            //找到指定的vip
                            $vip = Vip::find($item->invite_vip_id);
                            //如果用户有会员，就更新会员时间
                            $vip_meta = Vip_meta::where('user_id',$invite_user->id)->first();
                            if ($vip_meta){
                                $vip_meta->vip_id = $item->invite_vip_id;
                                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time."+".$vip->end_time." day"));
                                $vip_meta->save();
                            }else{
                                $vip_meta = new Vip_meta();
                                $vip_meta->user_id = $invite_user->id;
                                $vip_meta->vip_id = $item->invite_vip_id;
                                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime("+".$vip->end_time." day"));
                                $vip_meta->save();
                            }
                        }

                    }
                }
            }else{
                return response()->json(['message' => '邀请码不存在','status'=>401], 401);
            }
        }

        $token = $user->createToken('auth_token')->accessToken;

        return response()->json(['token' => $token,'message'=>'注册成功！','status'=>200], 200);
    }

    private function getRandChar(int $int)
    {
        $str = null;
        $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
        $max = strlen($strPol) - 1;

        for ($i = 0; $i < $int; $i++) {
            $str .= $strPol[rand(0, $max)];
        }

        return $str;
    }

    public function reset_password(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:8',
        ], [
            'email.required' => '邮箱必须填写',
            'email.email' => '邮箱格式不正确',
            'email.exists' => '邮箱不存在',
            'password.required' => '密码必须填写',
            'password.min' => '密码不能少于8位',
        ]);
        $email = $request->input("email");
        $code = $request->input("email_code");
        $EMAIL_VERIFY_CODE = "email:verify:code:" . $email;//redis key
        $isCode = Redis::get($EMAIL_VERIFY_CODE);
        if ($isCode && $isCode == $email.$code) {
            Redis::del($EMAIL_VERIFY_CODE);
        }else{
            return response()->json(['message' => '验证码错误','status'=>401], 401);
        }

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first(),'status'=>401], 401);
        }

        $user = User::where('email',$email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message'=>'重置成功！','status'=>200], 200);
    }

    public function get_user(Request $request){
        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_id =  auth()->guard('api')->user()->id;
        $user = User::where('id',$user_id)->first();
        $order = Order::where('user_id',$user_id)->where('type',0)->orderBy('created_at','DESC')->get();
        $v_order = Order::where('user_id',$user_id)->where('type',1)->orderBy('created_at','DESC')->get();
        $vip = Vip_meta::where('user_id',$user_id)->join('vips','vip_meta.vip_id','=','vips.id')->select('vips.title','vips.limit_send','vip_meta.expire_time')->first();
        $invite_meta = Invite_meta::with('invite_user')->where('parent_id',$user_id)->orderBy('created_at','desc')->get();
        $invite_set = InviteSet::with('vip')->get();
        return response()->json(['data' => $user,'vip'=>$vip,'order'=>$order,'v_order'=>$v_order,'invite_meta'=>$invite_meta,'invite_set'=>$invite_set,'status'=>200], 200);
    }

    public function update_user(Request $request){
        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_id =  auth()->guard('api')->user()->id;
        $user = User::find($user_id);
        $user->name = $request->input('name');
        $user->phone = $request->input('phone');
        $user->description = $request->input('description');
        $user->save();
        return response()->json(['message' => '修改成功','status'=>200], 200);
    }



    public function change_password(Request $request){
        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_id =  auth()->guard('api')->user()->id;
        $user = User::find($user_id);
        $password = $request->input('password');
        $new_password = $request->input('new_password');
        if (Hash::check($password, $user->password)) {
            $user->password = Hash::make($new_password);
            $user->save();
            return response()->json(['message' => '修改成功','status'=>200], 200);
        }else{
            return response()->json(['message' => '密码错误','status'=>401], 401);
        }
    }

    public function sendEmailCode(Request $request)
    {
        $email = $request->input("email");
        $EMAIL_VERIFY_CODE = "email:verify:code:" . $email;//redis key
        $isCode = Redis::get($EMAIL_VERIFY_CODE);
        if ($isCode) {
            return response()->json(["status" => 401, "message" => "请勿重复发送"],401);
        }
        $code = rand(100000, 999999);//验证码
        $expireTime = 60 * 3;//过期时间
        Redis::setex($EMAIL_VERIFY_CODE, $expireTime, $email.$code);


        Mail::send('mail.SendEmailCode', [
            'code' => $code,
            'email' => $email,
        ], function ($message) use ($email) {
            $message->subject('邮箱验证');
            $message->to($email);
        });

        return response()->json(["status" => 200, "message" => "发送成功"],200);

    }

}
