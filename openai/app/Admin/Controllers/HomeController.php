<?php

namespace App\Admin\Controllers;

use App\Models\Ai_draw;
use App\Models\Message;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Slowlyo\OwlAdmin\Renderers\Card;
use Slowlyo\OwlAdmin\Renderers\Flex;
use Slowlyo\OwlAdmin\Renderers\Html;
use Slowlyo\OwlAdmin\Renderers\Grid;
use Slowlyo\OwlAdmin\Renderers\Chart;
use Slowlyo\OwlAdmin\Renderers\Image;
use Slowlyo\OwlAdmin\Renderers\Action;
use Slowlyo\OwlAdmin\Renderers\Custom;
use Slowlyo\OwlAdmin\Renderers\Wrapper;
use Illuminate\Http\Resources\Json\JsonResource;
use Slowlyo\OwlAdmin\Controllers\AdminController;

class HomeController extends AdminController
{
    protected string $queryPath = 'dashboard';

    protected string $pageTitle = '首页';

    public function index(): JsonResponse|JsonResource
    {
        $page = $this->basePage()->css($this->css())->body([
            Grid::make()->columns([
                $this->frameworkInfo()->md(5),
                Flex::make()->items([
                    $this->pieChart(),
                ]),
            ]),
            Grid::make()->columns([
                $this->lineChart()->md(12),
                Flex::make()->className('h-full')->items([
                    $this->giteeWidget(),
                ])->direction('column'),
            ]),
        ]);

        return $this->response()->success($page);
    }

    /**
     * gitee widget
     */
    public function giteeWidget()
    {
        return Card::make()
            ->className('h-full clear-card-mb gitee-box overflow-auto')
            ->body(
                Custom::make()->id('osc-gitee-widget-tag')->onMount(<<<JS
// 隐藏 gitee-box
document.querySelector(".gitee-box").style.display = "none"



// 隐藏元素
const hideElementByClassName = (className) => {
    const element = document.querySelector(className)
    if (element) {
        element.style.display = "none"
    }
}

setTimeout(() => {
    // 移除 gitee-box 下的 cxd-Card-body 的 padding
    const giteeBox = document.querySelector(".gitee-box")
    if (giteeBox) {
        giteeBox.querySelector(".cxd-Card-body").style.padding = "0"
    }

    // 隐藏不需要的元素
    let hideClassName = [".osc_git_info", ".osc_git_issuecommits", ".osc_git_copyright"]
    hideClassName.forEach(className =>  hideElementByClassName(className) )

    // 隐藏边框
    const oscBorderColor = document.querySelectorAll(".osc_border_color")
    oscBorderColor.forEach(element => element.style.borderColor = "transparent")

    // 显示
    giteeBox.style.display = "block"
}, 1000)
JS
                )
            );
    }

    public function clock(): Card
    {
        return Card::make()->className('h-full bg-blingbling')->header([
            'title' => '时钟',
        ])->body([
            Custom::make()
                ->name('clock')
                ->html('<div id="clock" class="text-4xl"></div><div id="clock-date" class="mt-5"></div>')
                ->onMount(<<<JS
const clock = document.getElementById('clock');
const tick = () => {
    clock.innerHTML = (new Date()).toLocaleTimeString();
    requestAnimationFrame(tick);
};
tick();

const clockDate = document.getElementById('clock-date');
clockDate.innerHTML = (new Date()).toLocaleDateString();
JS

                ),
        ]);
    }

    public function frameworkInfo(): Card
    {
        return Card::make()->className('h-96')->body(
            Wrapper::make()->className('h-full')->body([
                Flex::make()->className('h-full')->direction('column')->justify('center')->items([
                    Image::make()->src(url(config('admin.logo'))),
                    Wrapper::make()->className('text-3xl mt-9')->body(config('admin.name')),
                    Flex::make()->className('w-64 mt-5')->justify('space-around')->items([
                        Action::make()
                            ->level('link')
                            ->label('Version ' . config('admin.version'))
                            ->blank(true)
                            ->actionType('url')
                            ->blank(true)
                            ->link('#'),

                    ]),
                ]),
            ])
        );
    }

    public function pieChart(): Card
    {
        $user_c = User::count();
        $order_c = Order::count();
        $message_c = Message::count();
        $ai_c = Ai_draw::count();
        return Card::make()->className('h-96')->body(
            Chart::make()->height(350)->config("{
  tooltip: { trigger: 'item' },
  legend: { bottom: 0, left: 'center' },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: {
        label: { show: true, fontSize: '40', fontWeight: 'bold' }
      },
      labelLine: { show: false },
      data: [
        { value: $order_c, name: '订单量' },
        { value: $user_c, name: '用户数量' },
        { value: $message_c, name: 'AI问答' },
        { value: $ai_c, name: 'AI绘画' },
      ]
    }
  ]
}")
        );
    }

    public function lineChart(): Card
    {
        $randArr = function () {
            $_arr = [];
            for ($i = 0; $i < 7; $i++) {
                $_arr[] = random_int(10, 200);
            }
            return '[' . implode(',', $_arr) . ']';
        };

        $random1 = $randArr();
        $random2 = $randArr();
//        根据users表中的数据生成图表 只统计最近7天的数据

        $users = User::select(DB::raw('count(*) as count, date(created_at) as date'))
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
        $orders = Order::select(DB::raw('count(*) as count, date(created_at) as date'))
            ->where('status', 1)
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->toArray();
        $chart = Chart::make()->height(350)->config("{
    tooltip: { trigger: 'axis' },
    legend: { data: ['用户注册量', '成功订单量'] },
    xAxis: { type: 'category', boundaryGap: false, data: " . json_encode(array_column($users, 'date')) . " },
    yAxis: { type: 'value' },
    series: [
        { name: '用户注册量', type: 'line', data: " . json_encode(array_column($users, 'count')) . " },
        { name: '成功订单量', type: 'line', data: " . json_encode(array_column($orders, 'count')) . " },
    ]
}");

        return Card::make()->className('clear-card-mb')->body($chart);
    }

    public function cube(): Card
    {
        return Card::make()->className('h-96 ml-4 w-8/12')->body(
            Html::make()->html(<<<HTML
<style>
    .cube-box{ height: 300px; display: flex; align-items: center; justify-content: center; }
  .cube { width: 100px; height: 100px; position: relative; transform-style: preserve-3d; animation: rotate 10s linear infinite; }
  .cube:after {
    content: '';
    width: 100%;
    height: 100%;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
    position: absolute;
    transform-origin: bottom;
    transform-style: preserve-3d;
    transform: rotateX(90deg) translateY(50px) translateZ(-50px);
    background-color: rgba(0, 0, 0, 0.1);
  }
  .cube div {
    background-color: rgba(64, 158, 255, 0.7);
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid rgb(27, 99, 170);
    box-shadow: 0 0 60px rgba(64, 158, 255, 0.7);
  }
  .cube div:nth-child(1) { transform: translateZ(-50px); animation: shade 10s -5s linear infinite; }
  .cube div:nth-child(2) { transform: translateZ(50px) rotateY(180deg); animation: shade 10s linear infinite; }
  .cube div:nth-child(3) { transform-origin: right; transform: translateZ(50px) rotateY(270deg); animation: shade 10s -2.5s linear infinite; }
  .cube div:nth-child(4) { transform-origin: left; transform: translateZ(50px) rotateY(90deg); animation: shade 10s -7.5s linear infinite; }
  .cube div:nth-child(5) { transform-origin: bottom; transform: translateZ(50px) rotateX(90deg); background-color: rgba(0, 0, 0, 0.7); }
  .cube div:nth-child(6) { transform-origin: top; transform: translateZ(50px) rotateX(270deg); }

  @keyframes rotate {
    0% { transform: rotateX(-15deg) rotateY(0deg); }
    100% { transform: rotateX(-15deg) rotateY(360deg); }
  }
  @keyframes shade { 50% { background-color: rgba(0, 0, 0, 0.7); } }
</style>
<div class="cube-box">
    <div class="cube">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
HTML

            )
        );
    }

    private function css(): array
    {
        return [
            '.clear-card-mb'                 => [
                'margin-bottom' => '0 !important',
            ],
            '.amis-scope .cxd-Image'                     => [
                'border' => '0',
            ],
            '.amis-scope .bg-blingbling'                 => [
                'color'             => '#fff',
                'background'        => 'linear-gradient(to bottom right, #2C3E50, #FD746C, #FF8235, #ffff1c, #92FE9D, #00C9FF, #a044ff, #e73827)',
                'background-repeat' => 'no-repeat',
                'background-size'   => '1000% 1000%',
                'animation'         => 'gradient 60s ease infinite',
            ],
            '@keyframes gradient'            => [
                '0%{background-position:0% 0%}
                  50%{background-position:100% 100%}
                  100%{background-position:0% 0%}',
            ],
            '.amis-scope .bg-blingbling .cxd-Card-title' => [
                'color' => '#fff',
            ],
        ];
    }
}
