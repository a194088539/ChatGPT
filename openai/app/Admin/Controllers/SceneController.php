<?php

namespace App\Admin\Controllers;

use Illuminate\Http\JsonResponse;
use Slowlyo\OwlAdmin\Renderers\Page;
use Slowlyo\OwlAdmin\Renderers\Form;
use Slowlyo\OwlAdmin\Renderers\TableColumn;
use Slowlyo\OwlAdmin\Renderers\TextControl;
use Illuminate\Http\Resources\Json\JsonResource;
use Slowlyo\OwlAdmin\Controllers\AdminController;
use App\Services\SceneService;

class SceneController extends AdminController
{
    protected string $serviceName = SceneService::class;

    protected string $pageTitle = 'Scene';

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
				TableColumn::make()->name('title')->label('名称'),
				TableColumn::make()->name('Instruction')->label('指令'),
				TableColumn::make()->name('created_at')->label('创建时间')->type('datetime')->sortable(true),
				TableColumn::make()->name('updated_at')->label('更新时间')->type('datetime')->sortable(true),
                $this->rowActions(),
            ]);

        return $this->baseList($crud);
    }

    public function form(): Form
    {
        return $this->baseForm()->body([
            TextControl::make()->name('title')->label('名称'),
			TextControl::make()->name('Instruction')->label('指令'),
        ]);
    }

    public function detail(): Form
    {
        return $this->baseDetail()->body([
            TextControl::make()->static(true)->name('id')->label('ID'),
			TextControl::make()->static(true)->name('title')->label('名称'),
			TextControl::make()->static(true)->name('Instruction')->label('指令'),
			TextControl::make()->static(true)->name('created_at')->label('创建时间'),
			TextControl::make()->static(true)->name('updated_at')->label('更新时间')
        ]);
    }
}
