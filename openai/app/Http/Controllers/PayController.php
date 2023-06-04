<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/2   16:01
 */
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use App\Models\Vip;
use App\Models\Vip_meta;
class PayController extends Controller
{
    public function alipay(Request $request)
    {
        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_id =  auth()->guard('api')->user()->id;
        $type = $request->input('type');

        $user = User::find($user_id);
        $order = date('YmdHis') . mt_rand(1000, 9999);
        $out_trade_no = $order;
        if ($type=='charge'){
            $pay_info = app('alipay')->scan([
                'out_trade_no' => $order,
                'total_amount' => $request->input('amount'),
                'subject' => '充值余额'.$order,
            ]);
            //充值余额
            $order = new Order();
            $order->user_id = $user_id;
            $order->user_amount = $user->money;
            $order->title = '充值余额';
            $order->order_id = $out_trade_no;
            $order->amount = $request->input('amount');
            $order->status = 0;
            $order->way = 'alipay';
            $order->save();
        }else{
            $v_id = $request->input('v_id');
            $title = Vip::find($v_id)->title;
            $pay_info = app('alipay')->scan([
                'out_trade_no' => $order,
                'total_amount' => $request->input('amount'),
                'subject' => '购买会员'.$title,
            ]);
            //购买会员
            $order = new Order();
            $order->user_id = $user_id;
            $order->user_amount = $user->money;
            $order->title = '购买'.$title;
            $order->order_id = $out_trade_no;
            $order->amount = $request->input('amount');
            $order->status = 0;
            $order->type=1;
            $order->way = 'alipay';
            $order->save();
        }
        if ($pay_info->code == 10000){
            return response()->json(['qr_code' => $pay_info->qr_code,'status'=>200],200);
        }else{
            return response()->json(['message' => '支付生成失败','status'=>400],400);
        }

    }

    public function alipay_return(){
        // 校验提交的参数是否合法
        $data = app('alipay')->callback();

        // 如果订单状态不是成功或者结束，则不走后续的逻辑
        if (!in_array($data->trade_status, ['TRADE_SUCCESS', 'TRADE_FINISHED'])) {
            return '支付失败';
        }
        // 你的逻辑
        // 更新订单状态

        // 使用 $data->out_trade_no 可以获取到订单流水号，比如更新数据库的订单状态
        return '支付成功';
    }

    public function alipay_notify(){
        // 校验输入参数
        $data = app('alipay')->callback();
        // 如果订单状态不是成功或者结束，则不走后续的逻辑
        if (!in_array($data->trade_status, ['TRADE_SUCCESS', 'TRADE_FINISHED'])) {
            return app('alipay')->success();
        }
        // 你的逻辑
        Log::debug('Alipay 订单返回', $data->all());
        $order = Order::where('order_id',$data->out_trade_no)->first();
        if ($order->type == 0){
            // 更新订单状态
            $order->status = 1;
            $order->save();
            $user = User::find($order->user_id);
            $user->money = $user->money + $order->amount;
            $user->save();
        }else{
            $order->status = 1;
            $order->save();
            $title = str_replace('购买会员','',$data->subject);
            $vip = Vip::where('title',$title)->where('pay_amount',$order->amount)->first();
            $user = User::find($order->user_id);
            $vip_meta = Vip_meta::where('user_id',$user->id)->first();
            if ($vip_meta) {
                $vip_meta->vip_id = $vip->id;
                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time.'+'.$vip->end_time.' day'));
                $vip_meta->save();
            }else{
                $vip_meta = new Vip_meta();
                $vip_meta->user_id = $user->id;
                $vip_meta->vip_id = $vip->id;
                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime('+'.$vip->end_time.' day'));
                $vip_meta->save();
            }

        }

        // 使用 $data->out_trade_no 可以获取到订单流水号，比如更新数据库的订单状态
        return app('alipay')->success();
    }



    public function wechat_pay(Request $request){
        $user_id =  auth()->guard('api')->user();
        if ($user_id == null){
            return response()->json(['message' => '请先登录','status'=>401], 401);
        }
        $user_id =  auth()->guard('api')->user()->id;
        $user = User::find($user_id);
        $trade_no = date('YmdHis') . mt_rand(1000, 9999);
        $type = $request->input('type');
        $out_trade_no = $trade_no;
        if ($type == 'charge') {
            $order = [
                'out_trade_no' => $trade_no,
                'description' => '充值余额'.$trade_no,
                'amount' => [
                    'total' => $request->input('amount') * 100, // 单位为分
                ],
            ];
            //充值余额
            $orders = new Order();
            $orders->user_id = $user_id;
            $orders->user_amount = $user->money;
            $orders->title = '充值余额';
            $orders->order_id = $out_trade_no;
            $orders->amount = $request->input('amount');
            $orders->status = 0;
            $orders->way = 'wechat';
            $orders->save();
        }else{
            $v_id = $request->input('v_id');
            $title = Vip::find($v_id)->title;
            $order = [
                'out_trade_no' => $trade_no,
                'description' => '购买会员'.$title,
                'amount' => [
                    'total' => $request->input('amount') * 100, // 单位为分
                ],
            ];
            //购买会员
            $orders = new Order();
            $orders->user_id = $user_id;
            $orders->user_amount = $user->money;
            $orders->title = '购买'.$title;
            $orders->order_id = $out_trade_no;
            $orders->amount = $request->input('amount');
            $orders->status = 0;
            $orders->type=1;
            $orders->way = 'wechat';
            $orders->save();
        }

        $data = app('wechat')->scan($order);
        return response()->json(['status'=>'200','qr_code' => $data->code_url],200);
    }

    public function wechat_notify(){
        // 校验输入参数
        $data = app('wechat')->callback();
        // 如果订单状态不是成功或者结束，则不走后续的逻辑
        if (!in_array($data->summary, ['支付成功'])) {
            return app('wechat')->success();
        }
        // 你的逻辑
        // 更新订单状态
        Log::debug('Wechat 订单返回', $data->all());
        $order = Order::where('order_id',$data->resource['ciphertext']['out_trade_no'])->first();
        if ($order->title == '充值余额'){
            // 更新订单状态
            $order->status = 1;
            $order->save();
            $user = User::find($order->user_id);
            $user->money = $user->money + $order->amount;
            $user->save();
        }else{
            $order->status = 1;
            $order->save();
            $title = str_replace('购买','',$order->title);
            $vip = Vip::where('title',$title)->where('pay_amount',$order->amount)->first();
            $user = User::find($order->user_id);
            $vip_meta = Vip_meta::where('user_id',$user->id)->first();
            if ($vip_meta) {
                $vip_meta->vip_id = $vip->id;
                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time.'+'.$vip->end_time.' day'));
                $vip_meta->save();
            }else{
                $vip_meta = new Vip_meta();
                $vip_meta->user_id = $user->id;
                $vip_meta->vip_id = $vip->id;
                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime('+'.$vip->end_time.' day'));
                $vip_meta->save();
            }

        }


        // 使用 $data->out_trade_no 可以获取到订单流水号，比如更新数据库的订单状态
        return app('wechat')->success();
    }

    public function wechat_return(){
        $data = app('wechat_pay')->callback();
        // 如果订单状态不是成功或者结束，则不走后续的逻辑
        if (!in_array($data->result_code, ['SUCCESS', 'FINISHED'])) {
            return 'fail';
        }
        // 你的逻辑
        // 更新订单状态
        // 使用 $data->out_trade_no 可以获取到订单流水号，比如更新数据库的订单状态
        return 'success';
    }
}
