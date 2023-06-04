<?php

namespace App\Admin\Controllers;

use App\Models\Card;
use App\Models\User;
use App\Models\Vip;
use App\Models\Vip_meta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Slowlyo\OwlAdmin\Renderers\Page;
use Slowlyo\OwlAdmin\Renderers\Form;
use Slowlyo\OwlAdmin\Renderers\SelectControl;
use Slowlyo\OwlAdmin\Renderers\TableColumn;
use Slowlyo\OwlAdmin\Renderers\TextControl;
use Illuminate\Http\Resources\Json\JsonResource;
use Slowlyo\OwlAdmin\Controllers\AdminController;
use App\Services\CardService;

class CardController extends AdminController
{
    protected string $serviceName = CardService::class;

    protected string $pageTitle = '卡密';


    public function index(): JsonResponse|JsonResource
    {
        // 返回列表数据
        if ($this->actionOfGetData()) {
            // 此处的->query() 等效于 AdminRole::query()
            if (request()->query('code')){
                $items = $this->service
                    ->query()
                    ->where('code', 'like', "%".request()->query('code')."%")
                    ->orderBy('id', 'desc')
                    ->paginate(request()->query('perPage', 20))
                    ->items();
            }else{
                $items = $this->service
                    ->query()
                    ->orderBy('id', 'desc')
                    ->paginate(request()->query('perPage', 20))
                    ->items();
            }

            $total = $this->service->query()->count();

            // amis 的 crud 组件需要的两个参数
            return $this->response()->success(compact('items', 'total'));
        }

        // 返回页面结构
        return $this->response()->success($this->list());
    }

    public function list(): Page
    {
        $crud = $this->baseCRUD()
            ->headerToolbar([
                $this->createButton(),
                ...$this->baseHeaderToolBar(),
                // 添加导出按钮
                $this->exportAction(),
            ])
            ->filterTogglable(false)
            // 列表筛选部分表单
            ->filter($this->baseFilter()->body([
                // 内容就是 Form 的 body 属性
                // 数据筛选的查询需要再 index() 方法中自行实现
                TextControl::make()->name('code')->label('兑换码'),
            ]))
            ->columns([
                TableColumn::make()->name('id')->label('ID')->sortable(true),
				TableColumn::make()->name('code')->label('兑换码'),
				TableColumn::make()->name('balance')->label('余额'),
				TableColumn::make()->name('vip_level')->label('会员ID'),
				TableColumn::make()->name('is_used')->label('是否使用')->type('status'),
                TableColumn::make()->name('user_id')->label('使用者ID'),
                TableColumn::make()->name('created_at')->label('创建时间')->type('datetime')->sortable(true),
				TableColumn::make()->name('updated_at')->label('更新时间')->type('datetime')->sortable(true),
                $this->rowActions(),
            ]);

        return $this->baseList($crud);
    }

    public function form(): Form
    {
        $vip = Vip::all();
        return $this->baseForm()->body([
            TextControl::make()->name('balance')->label('余额'),
            SelectControl::make()->label('会员ID')->name('vip_level')->options($this->getOptions($vip)),
            TextControl::make()->name('number_s')->label('生成数量'),
        ]);
    }

    public function edit($id): Form
    {
        $vip = Vip::all();
        $card = Card::find($id);
        return $this->baseForm($id)->api(['url'=>'/card/'.$id.'/edit','method'=>'put'
        ])->body([
            TextControl::make()->name('id')->label('ID')->value($card->id)->hidden(true),
            TextControl::make()->name('code')->label('兑换码')->value($card->code),
            TextControl::make()->name('balance')->label('余额')->value($card->balance),
            SelectControl::make()->label('会员ID')->name('vip_level')->options($this->getOptions($vip))->value($card->vip_level),
            TextControl::make()->name('is_used')->label('是否使用')->type('switch')->value($card->is_used),
        ]);

    }

    public function update(Request $request)
    {
        $card = Card::find($request->input('id'));
        $card->code = $request->input('code');
        $card->balance = $request->input('balance');
        $card->vip_level = $request->input('vip_level');
        $card->is_used = $request->input('is_used');
        $card->save();
        return $this->response()->success(['value'=>$card],'修改成功');
    }


    public function getOptions($vip) {
        $data = array();
        foreach ($vip as $v) {
            array_push($data, array(
                "label" => $v->title,
                "value" => $v->id
            ));
        }
        array_push($data, array(
            "label" => '无',
            "value" => 0
        ));
        return $data;
    }

    public function detail(): Form
    {
        return $this->baseDetail()->body([
            TextControl::make()->static(true)->name('id')->label('ID'),
			TextControl::make()->static(true)->name('code')->label('兑换码'),
			TextControl::make()->static(true)->name('balance')->label('余额'),
			TextControl::make()->static(true)->name('vip_level')->label('VIP_ID'),
			TextControl::make()->static(true)->name('is_used')->label('是否使用')->type('switch'),
			TextControl::make()->static(true)->name('created_at')->label('创建时间'),
			TextControl::make()->static(true)->name('updated_at')->label('更新时间')
        ]);
    }

    public function store(Request $request)
    {
        $balance = $request->input('balance');
        $number = $request->input('number_s');
        //生成指定数量的卡密
        for ($i = 0; $i < $number; $i++) {
            $code = $this->getRandChar(16);
            $card = new Card();
            $card->code = $code;
            $card->balance = $balance;
            $card->vip_level = $request->input('vip_level');
            $card->is_used = 0;
            $card->save();
        }
        return $this->response()->success(['value'=>$card],'添加成功');



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
}
