<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Monolog\Logger;
use Yansongda\Pay\Pay;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // 往服务容器中注入一个名为 alipay 的单例对象
        $this->app->singleton('alipay',function(){
            //此处$config = config('pay.alipay');
            $config = config('pay');
            //判断当前项目运行环境是否为线上环境
            if(app()->environment() !== 'production'){
                //修改此处$config['mode'] = 'dev';
                //$config['alipay']['default']['mode']  = 1;
                $config['log']['level'] = Logger::DEBUG;
            }else{
                $config['log']['level'] = Logger::WARNING;
            }
            //调用Yansongda\Pay来创建一个支付宝支付对象
            return Pay::alipay($config);
        });

        $this->app->singleton('wechat', function () {
            $config = config('pay');
            if (app()->environment() !== 'production') {
                $config['log']['level'] = Logger::DEBUG;
            } else {
                $config['log']['level'] = Logger::WARNING;
            }
            // 调用 Yansongda\Pay 来创建一个微信支付对象
            return Pay::wechat($config);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

        Schema::defaultStringLength(191);

        //
    }
}
