<?php

namespace App\Admin\Controllers;

use App\Models\Setting;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Slowlyo\OwlAdmin\Renderers\Image;
use Slowlyo\OwlAdmin\Renderers\InputKVS;
use Slowlyo\OwlAdmin\Renderers\RadiosControl;
use Slowlyo\OwlAdmin\Renderers\Tab;
use Slowlyo\OwlAdmin\Renderers\Tabs;
use Slowlyo\OwlAdmin\Renderers\Alert;
use Slowlyo\OwlAdmin\Renderers\InputKV;
use Slowlyo\OwlAdmin\Renderers\TextareaControl;
use Slowlyo\OwlAdmin\Renderers\TextControl;
use Slowlyo\OwlAdmin\Controllers\AdminController;

class SettingController extends AdminController
{

    protected string $serviceName = SettingService::class;

    protected string $queryPath = 'system/settings';

    protected string $pageTitle = '系统设置';

    public function index()
    {
        $page = $this->basePage()->body([
            Alert::make()->showIcon(true)->body("此处内容请严格按照规定修改，否则可能导致系统无法正常运行！"),
            $this->form(),
        ]);

        return $this->response()->success($page);
    }

    public function form()
    {
        $settings = Setting::all();
        return $this->baseForm()
            ->api($this->getStorePath())
            ->data($settings)
            ->body(
                Tabs::make()->tabs([
                    Tab::make()->title('基本设置')->body([
                        $settings->map(function ($item) {
                            if ($item->option_name=='logo'){
                                return Image::make()->label($item->info)->name($item->option_name)->type('input-image')->uploadUrl('/api/uploads')->value($item->option_value);
                            }else if (in_array($item->option_name,['title','description','keywords','APP_URL','buy_card','REG_MONEY','GPT_KEY'])){
                                return TextControl::make()->label($item->info)->name($item->option_name)->value($item->option_value);
                            }else if (in_array($item->option_name,['AI_QS','AI_DRAW'])){
                                return TextControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->type('input-number')->step(0.01);
                            }else if ($item->option_name == 'qs_is_web') {
                                return RadiosControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->options([
                                    ['label' => '官方接口', 'value' => 1],
                                    ['label' => '官方转接口', 'value' => 2],
                                ]);
                            }else if($item->option_name == 'choose_draw'){
                                return RadiosControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->options([
                                    ['label' => '官方接口', 'value' => 1],
                                    ['label' => '官方转接口', 'value' => 2],
                                ]);
                            }else if ($item->option_name == 'no_keywords') {
                                return TextareaControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->description('每行一个关键词,以,逗号隔开');
                            }
                        }),

                    ]),
                    Tab::make()->title('图片设置')->body([
                        Alert::make()->showIcon(true)->body("使用的是阿里OSS的对象存储，需要在阿里云申请开通OSS服务，然后在此处填写相关信息。"),
                        $settings->map(function ($item) {
                            if (in_array($item->option_name,['OSS_ACCESS_KEY_ID','OSS_ACCESS_KEY_SECRET','OSS_ENDPOINT','OSS_BUCKET'])){
                                return TextControl::make()->label($item->info)->name($item->option_name)->value($item->option_value);
                            }
                            if ($item->option_name == 'is_localhost'){
                                return RadiosControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->options([
                                    ['label' => '是', 'value' => 1],
                                    ['label' => '否', 'value' => 0],
                                ]);
                            }
                        }),
                    ]),
                    Tab::make()->title('支付设置')->body([
                        Alert::make()->showIcon(true)->body("支付宝和微信都需要上传证书！！！。"),
                        $settings->map(function ($item,$i=1) {
                            if (in_array($item->option_name,['pay_wechat_open','pay_alipay_open'])){
                                return RadiosControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->options([
                                    ['label' => '开启', 'value' => 1],
                                    ['label' => '关闭', 'value' => 0],
                                ]);

                            }
                            if (in_array($item->option_name,['ALIPAY_APP_ID','ALIPAY_APP_SECRET_CERT','WECHAT_MCH_ID','WECHAT_MCH_SECRET_KEY','WECHAT_MP_APP_ID'])){
                                if ($item->option_name=='ALIPAY_APP_SECRET_CERT'){
                                    return TextareaControl::make()->label($item->info)->name($item->option_name)->value($item->option_value)->description('支付宝密钥内容');
                                }else{
                                    return TextControl::make()->label($item->info)->name($item->option_name)->value($item->option_value);
                                }
                            }

                            }),

                    ]),
                    Tab::make()->title('邮箱设置')->body([
                        $settings->map(function ($item) {
                            if (in_array($item->option_name,['MAIL_HOST','MAIL_PORT','MAIL_USERNAME','MAIL_PASSWORD','MAIL_ENCRYPTION','MAIL_FROM_ADDRESS'])){
                                return TextControl::make()->label($item->info)->name($item->option_name)->value($item->option_value);
                            }
                        }),
                    ]),

                ])
            );
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $arrays=[
            'ALIPAY_APP_ID','ALIPAY_APP_SECRET_CERT','WECHAT_MCH_ID','WECHAT_MCH_SECRET_KEY','WECHAT_MP_APP_ID','MAIL_HOST','MAIL_PORT','MAIL_USERNAME','MAIL_PASSWORD','MAIL_ENCRYPTION','MAIL_FROM_ADDRESS','OSS_ACCESS_KEY_ID','OSS_ACCESS_KEY_SECRET','OSS_ENDPOINT','OSS_BUCKET','APP_URL'
        ];
        //return  $data['items'];
        foreach ($data as $key=>$value) {
            if ($key != 'items') {
                $set = Setting::where('option_name', $key)->first();
                $set->option_value = $value;
                $set->save();

                if (in_array($key,$arrays)){
                    updateEnv([$key=>$value]);
                }
            }
        }
        return $this->response()->success(['status' => 0],'保存成功');
    }

}
