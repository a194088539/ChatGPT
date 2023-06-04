<?php

namespace App\Http\Controllers;
use App\Models\Card;
use App\Models\Scene;
use App\Models\Setting;
use Carbon\Carbon;

use App\Models\Ai_draw;
use App\Models\User;
use App\Models\Vip;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\Message;
use App\Models\Vip_meta;
use Orhanerday\OpenAi\OpenAi;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function test(Request $request)
    {
        $info  = $request->input('info');
        if ($info == null){
            return response()->json(['message' => '请输入内容','status'=>401], 401);
        }

        $arr = array(
            "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",
            "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",
            "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");
        $result = null;
        $keywords = ['黄色网站','黄色','色情','草','做爱','口交','肛交','hentai','你妈','日你吗','第一次性','第一次爱','第一次那个','操','艹','赌博','菠菜','博彩','肉搏','乳交','垃圾','谣言','傻逼','sb','牛马','牛头人','歧视','打钱','日了','抢劫','婊','淫','性爱','屌','碧池','碧莲','傻猫','傻吊','撸','三级','R级','伦理','r级','限制级','色站','成人','叁级','美腿','毒品','你懂得','见不得人','棋牌','大乐透','qp','双色球','时时彩','钓鱼脚本','政府','共产党','反动','资产阶级','革命','宪政','民主','独裁','暴政','腐败','极权','贪污','暴力','借贷','外挂','盗窃','强盗','贩卖','战争','间谍','公安','狗屎','网安','ddos','cc攻击','攻击','社工','身份证','黑客','恐怖组织','恐怖运动'
        ];
        // 执行检测
        $is_filter = $this->filter_keywords($info, $keywords);

        if ($is_filter) {
            return Response()->json(['message'=>'禁止发送违规词','status'=>401],401);
        }

        // gpt3.5
        // $data = array(
        //     [
        //         'role' => 'user',
        //         'content' => $info
        //     ]
        // );

        // foreach ($arr as $key) {
        //     $curl = curl_init();
        //     curl_setopt_array($curl, [
        //         CURLOPT_URL => 'https://api.openai.com/v1/chat/completions',
        //         CURLOPT_RETURNTRANSFER => true,
        //         CURLOPT_TIMEOUT=>30000,
        //         CURLOPT_POST => true,
        //         CURLOPT_HTTPHEADER => [
        //             'Content-Type: application/json',
        //             'Authorization: Bearer ' . $key
        //         ],
        //         CURLOPT_POSTFIELDS => json_encode([
        //             'messages'=> $data,
        //             'model' => 'gpt-3.5-turbo',
        //             'max_tokens' => 2000,
        //             'temperature' => 0.5,
        //         ])
        //     ]);
        //     // 请求结束
        //     $domain = curl_exec($curl);
        //     curl_close($curl);
        //     if ($domain != null) {
        //         break;
        //     }

        // }

        // //return $domain;
        // $result =  json_decode($domain,true);
        // if ($result == null) {
        //     return response()->json(['data'=>'机器人不知道你在说什么','status'=>200],200);
        // }
        // $result = htmlspecialchars($result['choices'][0]['message']['content']);
        // gpt3.5 end()

        // 临时

        foreach ($arr as $key) {
            $curl = curl_init();
            curl_setopt_array($curl, [
                CURLOPT_URL => 'https://v1.apigpt.cn/?q='.$info,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT=>30000,
                CURLOPT_POST => false,
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json',
                ],

            ]);
            // 请求结束
            $domain = curl_exec($curl);
            curl_close($curl);
            if ($domain != null) {
                break;
            }

        }
        // var_dump($domain);
        //return $domain;
        $result =  json_decode($domain,true);
        if ($result == null) {
            return response()->json(['data'=>'机器人不知道你在说什么','status'=>200],200);
        }
        $result = htmlspecialchars($result['ChatGPT_Answer']);
        // 临时结束
        $result =  str_replace('

', '', $result);
        $result = str_replace(' ','&nbsp;',$result);

        return response()->json(['data'=>$result,'status'=>200],200);

    }

    public $last = '';
    public $responseData = ''; // 使用 $responseData 变量来拼接响应数据

    function stream_callback($curl, $data)
    {
        //var_dump('错误在'.$data);
        //dd($data);
        echo $data;
         //设置响应头，确保浏览器正确解析返回的数据流
        if (!headers_sent() && !in_array('content-type', array_map('strtolower', headers_list()))) {
            //header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            header('Access-Control-Allow-Origin: *');
            header('X-Accel-Buffering: no');

        }

        //$data = str_replace('data:', '', $data);
        //转为数组
        $prefix = 'data:';

        // 判断数据段是否是以 "data:" 开头的
        if (strpos($data,$prefix) === 0) {
            // 截取 "data:" 后面的字符串
            $jsonString = substr($data, strlen($prefix));
            // 将字符串解析为数组

            //$obj = json_decode($jsonString);
            $obj = explode('data: ', $data);
            foreach ($obj as $key => $value) {
                if ($key == 0) {
                    continue;
                }
                $value = json_decode($value,true);
                if (isset($value['choices'][0]['delta']['content'])) {
                    $this->last .= $value['choices'][0]['delta']['content'];
                }
            }
            // 如果包含 content 属性，输出其值
            //if (isset($obj['choices'][0]['delta']['content'])) {
            //    $this->last .= $obj['choices'][0]['delta']['content'];
            //}
        }


        //判断stream流是否结束
        if (strpos($data, 'DONE') != false) {
            $sessionId = curl_getinfo($curl, CURLINFO_PRIVATE)['session_id'];
            $user_id = curl_getinfo($curl, CURLINFO_PRIVATE)['user_id'];
            $question = curl_getinfo($curl, CURLINFO_PRIVATE)['question'];
            $mss = Message::orderBy('session_id', 'desc')->first();
            $ms = new Message();
            if ($sessionId) {
                $ms->session_id = $sessionId;
            } else {
                $ms->session_id = $mss ? $mss->session_id + 1 : 1;
            }
            $ms->from_id = 1;
            $ms->user_id = $user_id;
            $ms->question = $question;
            $ms->message = $this->last;
            $ms->save();
        }


        // flush数据，确保数据被即时输出
        ob_flush();
        flush();


        return strlen($data);

    }

    public function send_bot(Request $request){

        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_money = $user_id->money;
        $user_id =  auth()->guard('api')->user()->id;
        $setting_QS = Setting::where('option_name','AI_QS')->first()->option_value;
        $setting_is_web = Setting::where('option_name','qs_is_web')->first()->option_value;
        $setting_no_k = Setting::where('option_name','no_keywords')->first()->option_value;

        $vip = Vip_meta::where('user_id',$user_id)->first();
        //先判断是否有vip
        if ($vip){
            //获取vip信息
            $vip = Vip_meta::where('user_id',$user_id)->join('vips','vip_meta.vip_id','=','vips.id')->select('vips.title','vips.limit_send','vip_meta.expire_time')->first();
            //获取今日发送次数
            $currentDate = Carbon::today();
            $today_send = Message::where('user_id',$user_id)->whereDate('created_at', $currentDate)->count();
            //判断次数是否超过并且用户没有余额
            if ($today_send+1 > $vip->limit_send && $user_money<$setting_QS){
                return response()->json(['message' => '今日发送次数已达上限','status'=>402], 402);
            }

        }
        $data_c = json_decode($request->getContent(), true);
        //如果没有vip并且余额不足
        if ($user_money <$setting_QS && $vip == null){
            return response()->json(['message' => '余额不足','status'=>402], 402);
        }

        $info  = $data_c['info'];
        if ($info == null){
            return response()->json(['message' => '请输入内容','status'=>401], 401);
        }
        $api_key = Setting::where('option_name','GPT_KEY')->first()->option_value;
        $arr = explode(',',$api_key);
        $result = null;
        $keywords = explode(',',$setting_no_k);
        // 执行检测
        $is_filter = $this->filter_keywords($info, $keywords);

        if ($is_filter) {
            return Response()->json(['message'=>'禁止发送违规词','status'=>401],401);
        }
        $sessionId= $data_c['session_id'];

        $data = array();
        //上下文
        $text_m = Message::where('session_id',$sessionId)->where('user_id',auth()->guard('api')->user()->id)->orderBy('id','ASC')->get();
        if ($text_m){
            $text_m = json_decode($text_m);
            $text_m = array_slice($text_m, -2);
            foreach($text_m as $item){
                $data[] = [
                    'role' => 'user',
                    'content' => str_replace("\n", "\\n", $item->question)
                ];
                $data[] = [
                    'role' => 'assistant',
                    'content' =>str_replace("\n", "\\n",  $item->message)
                ];

            }
        }

        $data[] = [
            'role' => 'user',
            'content' => $info
        ];
        //上下文end
        $result ='';

        if($setting_is_web=='1'){
            //gpt3.5

            //foreach ($arr as $key) {
                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_URL => 'https://api.openai.com/v1/chat/completions',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => 30000,
                    CURLOPT_POST => true,
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_WRITEFUNCTION => [$this, 'stream_callback'],
                    CURLOPT_PRIVATE => ['session_id' => $sessionId,'user_id' => $user_id,'question' => $info],
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json',
                        'Authorization: Bearer ' . $api_key,
                        'Accept: text/event-stream', // 指定 SSE 格式
                    ],

                    CURLOPT_POSTFIELDS => json_encode([
                        'messages' => $data,
                        'model' => 'gpt-3.5-turbo',
                        'max_tokens' => 2000,
                        'temperature' => 0.5,
                        'presence_penalty' => 0.5,
                        'frequency_penalty' => 0.5,
                        'stream' => true,
                    ])
                ]);
                // 请求结束
                $domain = curl_exec($curl);
                curl_close($curl);

            //gpt3.5 end()
        }else if ($setting_is_web == '2'){
            //dd($data);

            $curl = curl_init();
            curl_setopt_array($curl, [
                CURLOPT_URL => 'https://openai.1rmb.tk/v1/chat/completions',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 30000,
                CURLOPT_POST => true,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_WRITEFUNCTION => [$this, 'stream_callback'],
                CURLOPT_PRIVATE => ['session_id' => $sessionId,'user_id' => $user_id,'question' => $info],
                CURLOPT_HTTPHEADER => [
                    'Content-Type: application/json',
                    'Authorization: Bearer ' . $api_key,
                    'Accept: text/event-stream', // 指定 SSE 格式
                ],

                CURLOPT_POSTFIELDS => json_encode([
                    'messages' => $data,
                    'model' => 'gpt-3.5-turbo',
                    'max_tokens' => 2000,
                    'temperature' => 0.5,
                    'presence_penalty' => 0,
                    'frequency_penalty' => 0,
                    'stream' => true,
                ])
            ]);
            // 请求结束
            $domain = curl_exec($curl);
            curl_close($curl);
        }

        $user = User::find($user_id);
        if ($vip){
            $vip = Vip_meta::where('user_id',$user_id)->join('vips','vip_meta.vip_id','=','vips.id')->select('vips.title','vips.limit_send','vip_meta.expire_time')->first();
            $currentDate = Carbon::today();
            $today_send = Message::where('user_id',$user_id)->whereDate('created_at', $currentDate)->count();
            if ($today_send+1 > $vip->limit_send && $user->money >= $setting_QS){
                $user->money = $user->money - $setting_QS;
            }
        }else{
            $user->money = $user->money - $setting_QS;

        }
        $user->save();

        //return response()->json(['data'=>$result,'m_last'=>$ms,'status'=>200],200);
    }

    public function get_message(Request $request){
        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_id =  auth()->guard('api')->user()->id;
        $page = $request->input('page');
        $limit = $request->input('limit');
        $ms = Message::where('user_id',$user_id)
            ->orderBy('created_at','DESC')
            ->get()
            ->groupBy('session_id')
            ->forPage($page,$limit);
        $ms = $ms->sortByDesc(function($m) {
            // 将 created_at 字段的时间戳作为排序依据
            return $m->last()->created_at->timestamp;
        })->values()->all();
        $all_count = Message::where('user_id',$user_id)->get()->groupBy('session_id')->count();
        $scene = Scene::get();
        $last_info = Message::where('user_id',$user_id)->orderBy('id','DESC')->first();

        return response()->json(['data'=>$ms,'scene'=>$scene,'count'=>$all_count,'m_last'=>$last_info,'status'=>200],200);
    }

    public function c_message(Request $request)
    {
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $user_id = auth()->guard('api')->user()->id;
        $session_id = $request->input('session_id');
        $ms = Message::where('session_id', $session_id)->where('user_id',$user_id)->orderBy('created_at','ASC')->get();
        return response()->json(['data' => $ms, 'status' => 200], 200);
    }

    public function searchs(Request $request){
        $search = $request->input('search');
        $user_id =  auth()->guard('api')->user()->id;
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $ms = Message::where('user_id',$user_id)->where('question','like','%'.$search.'%')->get()->groupBy('session_id');
        return response()->json(['data'=>$ms,'status'=>200],200);
    }

    public function del_msg(Request $request){
        $user_id =  auth()->guard('api')->user()->id;
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $session_id = $request->input('session_id');
        $ms = Message::where('session_id',$session_id)->where('user_id',$user_id)->delete();
        if ($ms){
            return response()->json(['data'=>'删除成功','status'=>200],200);
        }else{
            return response()->json(['data'=>'删除失败','status'=>200],200);
        }
    }

    public function filter_keywords($content, $keywords)
    {
        foreach ($keywords as $keyword) {
            if (strpos($content, $keyword) !== false) {
                return true;
            }
        }
        return false;
    }

    public function get_vip_level(Request $request){
        $user_id =  auth()->guard('api')->user()->id;
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $vip = Vip::orderBy('level','ASC')->get();
        return response()->json(['data'=>$vip,'status'=>200],200);
    }

    public function get_baidu_accessToken()
    {
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://wenxin.baidu.com/moduleApi/portal/api/oauth/token',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode([
                'grant_type' => 'client_credentials',
                'client_id' => '1MH257g8GPqrLuVwqHyI48h5OwZqPT8l',
                'client_secret' => 'zfKwjdB9VmYg4mBb4PZU5EOcmBC85z7F',
            ])
        ]);
        // 请求结束
        $domain = curl_exec($curl);
        curl_close($curl);
        $domain = json_decode($domain, true);

        $access_token = $domain['data'];
        return $access_token;

    }

    public function send_draw(Request $request){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $access_token = $this->get_baidu_accessToken();
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://wenxin.baidu.com/moduleApi/portal/api/rest/1.0/ernievilg/v1/txt2img',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode([
                'access_token' => $access_token,
                'text' => '靓仔',
                'style' => '古风',
                'resolution'=>'1024*1024',
            ])
        ]);
        // 请求结束
        $domain = curl_exec($curl);
        curl_close($curl);
        $domain = json_decode($domain, true);
        //获取任务id的图
        $task_id = $domain['data']['taskId'];
        return response()->json(['data'=>$task_id,'message'=>'生成中...请等待30s~','status'=>200],200);
    }

    public function ai_draw(Request $request){
        $access_token = $this->get_baidu_accessToken();
        $task_id = $request->input('task_id');
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => 'https://wenxin.baidu.com/moduleApi/portal/api/rest/1.0/ernievilg/v1/getImg',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode([
                'access_token' => $access_token,
                'taskId' => $task_id,
            ])
        ]);
        // 请求结束
        $ai_pic = curl_exec($curl);
        curl_close($curl);
        $ai_pic = json_decode($ai_pic, true);
        //$ai_pic = $ai_pic['data']['imgUrls'];
        return response()->json(['data'=>$ai_pic,'status'=>200],200);
    }

    public function ai_draw_openai(Request $request){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $info = $request->input('prompt');
        $number = $request->input('number');
        $size = $request->input('size');
        if ($info == null){
            return response()->json(['message'=>'请输入内容','status'=>401],401);
        }
        if ($number == null){
            return response()->json(['message'=>'请输入数量','status'=>401],401);
        }
        if ($size == null){
            return response()->json(['message'=>'请输入尺寸','status'=>401],401);
        }
        $user_money = $user_id->money;
        $user_id =  auth()->guard('api')->user()->id;
        $setting_DRAW = Setting::where('option_name','AI_DRAW')->first()->option_value;

        $vip = Vip_meta::where('user_id',$user_id)->first();
        //判断会员
        if ($vip){
            //获取会员信息
            $vip = Vip_meta::where('user_id',$user_id)->join('vips','vip_meta.vip_id','=','vips.id')->select('vips.title','vips.limit_draw','vip_meta.expire_time')->first();
            $currentDate = Carbon::today();
            //判断绘画总数
            $today_send = Ai_draw::where('user_id', $user_id)
                ->whereDate('created_at', $currentDate)
                ->count();
            //如果会员次数已达上限且余额不足
            if ($today_send+$number > $vip->limit_draw && $user_money< $number*$setting_DRAW){
                return response()->json(['message' => '今日会员次数已达上限且余额不足','status'=>401], 401);
            }

        }
        if ($user_money < $number*$setting_DRAW && $vip == null){
            return response()->json(['message' => '余额不足','status'=>401], 401);
        }
        $choose_draw = Setting::where('option_name','choose_draw')->first()->option_value;
        $api_key = Setting::where('option_name','GPT_KEY')->first()->option_value;
        $arr = explode(',',$api_key);
        if ($choose_draw==1){
            foreach($arr as $key) {
                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_URL => 'https://api.openai.com/v1/images/generations',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => 30000,
                    CURLOPT_POST => true,
                    CURLOPT_SSL_VERIFYPEER => false,
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json',
                        'Authorization: Bearer ' . $key
                    ],
                    CURLOPT_POSTFIELDS => json_encode([
                        'prompt' => $info,
                        'n' => intval($number),
                        'size' => $size,
                    ])
                ]);
                // 请求结束
                $domain = curl_exec($curl);
                if ($domain === false) {
                    return response()->json(['data' => '请求失败', 'status' => 200], 200);
                }
                curl_close($curl);
                $domain = json_decode($domain, true);
            }
        }else if($choose_draw==2){
            foreach($arr as $key) {
                $curl = curl_init();
                curl_setopt_array($curl, [
                    CURLOPT_URL => 'http://8.210.157.61/api/ns_api.php',
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_TIMEOUT => 30000,
                    CURLOPT_POST => true,
                    CURLOPT_HTTPHEADER => [
                        'Content-Type: application/json',
                    ],
                    CURLOPT_POSTFIELDS => json_encode([
                        'prompt' => $info,
                        'number' => $number,
                        'size' => $size,
                        'key' =>$key
                    ])
                ]);
                // 请求结束
                $domain = curl_exec($curl);
                if ($domain === false) {
                    return response()->json(['data' => '请求失败', 'status' => 200], 200);
                }
                curl_close($curl);
                $domain = json_decode($domain, true);
            }
        }

        $new_arr =[];
        $is_local = Setting::where('option_name','is_localhost')->first()->option_value;

        foreach ($domain['data'] as $key){
            $ext = pathinfo(parse_url($key['url'], PHP_URL_PATH), PATHINFO_EXTENSION);
            // 生成新的文件名
            $filename = date('YmdHis') . '_' . uniqid() . '.' . $ext;
            // 下载文件到本地
            $tempFile = tempnam(sys_get_temp_dir(), 'upload');
            file_put_contents($tempFile, file_get_contents($key['url']));
            if ($is_local == '1') {
                // 上传文件到本地
                Storage::disk('public')->put($filename, fopen($tempFile, 'r'));
                $result =  Storage::disk('public')->url($filename);
            } else {
                // 上传文件到 OSS
                Storage::disk('oss')->put($filename, fopen($tempFile, 'r'));
                $result =  Storage::disk('oss')->url($filename);

            }
            // 删除本地临时文件
            unlink($tempFile);
            // 返回图片地址
            $new_arr[] = ['url'=>$result];

            $ai_draw = new Ai_draw();
            $ai_draw->user_id = $user_id;
            $ai_draw->title = $info;
            $ai_draw->image = $result;
            $ai_draw->is_public = 0;
            $ai_draw->save();
        }
        $user = User::find($user_id);
        if ($vip){
            $vip = Vip_meta::where('user_id',$user_id)->join('vips','vip_meta.vip_id','=','vips.id')->select('vips.title','vips.limit_send','vip_meta.expire_time')->first();
            $currentDate = Carbon::today();
            $today_send = Ai_draw::where('user_id', $user_id)
                ->whereDate('created_at', $currentDate)
                ->count();
            if ($today_send+$number > $vip->limit_draw && $user_money>= $number*$setting_DRAW){
                $user->money = $user->money - $number*$setting_DRAW;
            }
        }else{
            $user->money = $user->money - $number*$setting_DRAW;
        }
        $user->save();
        return response()->json(['data'=>$new_arr,'message'=>'生成成功~','status'=>200],200);
    }



    public function get_me_draw(){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $ai_draw = Ai_draw::where('user_id',$user_id->id)->orderBy('created_at','desc')->get();
        $ai_draw_public = Ai_draw::where('is_public',1)->orderBy('created_at','desc')->get();
        $set_draw = Setting::where('option_name','AI_DRAW')->first()->option_value;
        return \response()->json(['data'=>$ai_draw,'public'=>$ai_draw_public,'dw_m'=>$set_draw,'status'=>200],200);
    }

    public function send_public(Request $request){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $draw_id = $request->input('draw_id');
        $ai_draw = Ai_draw::where('user_id',$user_id->id)->where('id',$draw_id)->first();
        if ($ai_draw){
            $ai_draw->is_public = $ai_draw->is_public==0?1:0;
            $ai_draw->save();
        }
        return \response()->json(['message'=>'修改成功','status'=>200],200);
    }

    //邀请码生成
    public function invite_code(Request $request){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $invite_code = $this->getRandChar(6);
        $invite_code = strtoupper($invite_code);
        $user = User::find($user_id->id);
        if ($user->invite_code){
            return \response()->json(['message'=>'不得重复生成邀请码！','status'=>401],401);
        }
        $user->invite_code = $invite_code;
        $user->save();
        return \response()->json(['data'=>$invite_code,'status'=>200],200);


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

    public function kami_check(Request $request){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $kami = $request->input('code');
        $kami = Card::where('code',$kami)->first();
        if ($kami){
            if ($kami->is_used == 1){
                return response()->json(['message'=>'卡密已被使用！','status'=>401],401);
            }
            $kami->is_used = 1;
            $kami->user_id = $user_id->id;
            $kami->save();
            $info = '';
            if ($kami->balance!=0){
                $user = User::find($user_id->id);
                $user->money = $user->money + $kami->balance;
                $user->save();
                $info .= "充值".$kami->balance."元成功！";
            }
            if ($kami->vip_level!=0){
                $vip = Vip::where('id',$kami->vip_level)->first();
                $vip_meta = Vip_meta::where('user_id',$user_id->id)->first();
                if ($vip_meta){
                    $vip_meta->vip_id = $vip->id;
                    $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time."+".$vip->end_time." day"));
                    $vip_meta->save();
                    $info .= $vip->title."会员续费成功！";
                }else{
                    $vip_meta = new Vip_meta();
                    $vip_meta->user_id = $user_id->id;
                    $vip_meta->vip_id = $vip->id;
                    $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime("+".$vip->end_time." day"));
                    $vip_meta->save();
                    $info .= $vip->title."会员开通成功！";
                }
            }
            return response()->json(['message'=>'充值成功！','info'=>$info,'status'=>200],200);
        }else{
            return response()->json(['message'=>'卡密不存在！','status'=>401],401);
        }
    }

    public function get_setting(){
        $setting = Setting::all();
        $setting_arr = [];
        foreach ($setting as $item){
            if (in_array($item->option_name,['title','description','APP_URL','keywords','logo','buy_card','pay_alipay_open','pay_wechat_open'])){
                $setting_arr[$item->option_name] = $item->option_value;
            }
        }
        return response()->json(['data'=>$setting_arr,'status'=>200],200);
    }

    public function upload_avatar(Request $request){
        $user_id = auth()->guard('api')->user();
        if ($user_id == null) {
            return response()->json(['message' => '请先登录', 'status' => 401], 401);
        }
        $file = $request->file('file');
        $is_local = Setting::where('option_name','is_localhost')->first()->option_value;

        if ($file->isValid()) {
            $ext = $file->getClientOriginalExtension();
            if (!in_array($ext, ['jpg', 'jpeg', 'png'])) {
                return response()->json(['message' => '文件格式不正确', 'status' => 401], 401);
            }
            if ($is_local == 1){
                $path = '/' . date("Ym/d", time());
                $disk = Storage::disk('public');
                $path = $disk->put($path, $file);
                $new_img  = $disk->url($path);
            }else{
                $path = '/' . date("Ym/d", time());
                $disk = Storage::disk('oss');
                $path = $disk->put($path, $file);
                $new_img  = $disk->url($path);
            }
            $user = User::find($user_id->id);
            $user->avatar = $new_img;
            $user->save();
            return response()->json(['data'=>$new_img,'status'=>200],200);
        }
    }

}
