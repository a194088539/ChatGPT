<?php

namespace App\Admin\Controllers;

use App\Models\InviteSet;
use App\Models\User;
use App\Models\Vip;
use App\Models\Vip_meta;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Slowlyo\OwlAdmin\Renderers\Image;
use Slowlyo\OwlAdmin\Renderers\Page;
use Slowlyo\OwlAdmin\Renderers\Form;
use Slowlyo\OwlAdmin\Renderers\SelectControl;
use Slowlyo\OwlAdmin\Renderers\TableColumn;
use Slowlyo\OwlAdmin\Renderers\TextControl;
use Illuminate\Http\Resources\Json\JsonResource;
use Slowlyo\OwlAdmin\Controllers\AdminController;
use App\Services\InviteSetService;

class InviteSetController extends AdminController
{
    protected string $serviceName = InviteSetService::class;

    protected string $pageTitle = '邀请设置';

    public function index(): JsonResponse|JsonResource
    {
        if ($this->actionOfGetData()) {
            return $this->response()->success($this->service->list());
        }

        return $this->response()->success($this->list());
    }

    public function list(): Page
    {
        $crud = $this->baseCRUD()
            ->filterTogglable(false)
            ->columns([
                TableColumn::make()->name('id')->label('ID')->sortable(true),
				TableColumn::make()->name('invite_c')->label('邀请次数')->sortable(true),
				TableColumn::make()->name('invite_amount')->label('邀请赠金'),
				TableColumn::make()->name('invite_vip_id')->label('赠送会员')->sortable(true),
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
            TextControl::make()->name('invite_c')->label('邀请次数'),
			TextControl::make()->name('invite_amount')->label('赠送金额'),
            SelectControl::make()->label('赠送会员')->name('invite_vip_id')->options($this->getOptions($vip)),

        ]);
    }

    public function edit($id)
    {
        $vip = Vip::all();
        $invite = InviteSet::where('id', $id)->first();
        if ($invite){
            $vip_id = $invite->invite_vip_id;
        }else{
            $vip_id = 0;
        }
        return $this->baseForm()->api(['url'=>'/invite_setting/'.$id.'/edit','method'=>'put'
        ])->data($vip)->body([
            TextControl::make()->label('ID')->name('id')->required(true)->value($invite->id)->hidden(true),

            TextControl::make()->name('invite_c')->label('邀请次数')->value($invite->invite_c),
            TextControl::make()->name('invite_amount')->label('赠送金额')->value($invite->invite_amount),
            SelectControl::make()->label('赠送会员')->name('invite_vip_id')->options($this->getOptions($vip))->value($vip_id),

        ]);
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
			TextControl::make()->static(true)->name('invite_c')->label('InviteC'),
			TextControl::make()->static(true)->name('invite_amount')->label('InviteAmount'),
			TextControl::make()->static(true)->name('invite_vip_id')->label('InviteVipId'),
			TextControl::make()->static(true)->name('created_at')->label('创建时间'),
			TextControl::make()->static(true)->name('updated_at')->label('更新时间')
        ]);
    }

    public function store(Request $request)
    {
        $invite_c =$request->input('invite_c');
        $invite_amount =$request->input('invite_amount');
        $vip_id =$request->input('invite_vip_id');
        $invite_set = new InviteSet();
        $invite_set->invite_c = $invite_c;
        $invite_set->invite_amount = $invite_amount;
        $invite_set->invite_vip_id = $vip_id;
        $invite_set->save();
        return $this->response()->success(['value' => $invite_set],'添加成功');

    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        $vip_id =$request->input('invite_vip_id');
        $invite_c =$request->input('invite_c');
        $invite_amount =$request->input('invite_amount');
        $invite_set = InviteSet::where('id', $id)->first();
        $invite_set->invite_c = $invite_c;
        $invite_set->invite_amount = $invite_amount;
        $invite_set->invite_vip_id = $vip_id;
        $invite_set->save();

        return $this->response()->success(['value' => $vip_id],'修改成功');

    }
}
