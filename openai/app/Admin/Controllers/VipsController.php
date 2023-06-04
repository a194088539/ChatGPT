<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/5   18:54
 */
namespace App\Admin\Controllers;

use App\Models\Message;
use App\Models\User;
use App\Models\Vip;
use App\Models\Vip_meta;
use App\Services\AiService;
use App\Services\DrawService;
use App\Services\OrderService;
use App\Services\UserService;
use App\Services\VipService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Slowlyo\OwlAdmin\Renderers\Card;
use Slowlyo\OwlAdmin\Renderers\Column;
use Slowlyo\OwlAdmin\Renderers\Flex;
use Slowlyo\OwlAdmin\Renderers\Html;
use Slowlyo\OwlAdmin\Renderers\Grid;
use Slowlyo\OwlAdmin\Renderers\Chart;
use Slowlyo\OwlAdmin\Renderers\Image;
use Slowlyo\OwlAdmin\Renderers\Action;
use Slowlyo\OwlAdmin\Renderers\Custom;
use Slowlyo\OwlAdmin\Renderers\SelectControl;
use Slowlyo\OwlAdmin\Renderers\TextareaControl;
use Slowlyo\OwlAdmin\Renderers\TextControl;
use Slowlyo\OwlAdmin\Renderers\Wrapper;
use Slowlyo\OwlAdmin\Renderers\InputKV;
use Slowlyo\OwlAdmin\Controllers\AdminController;
use Illuminate\Http\Resources\Json\JsonResource;

class VipsController extends AdminController{

    // 功能对应的Service
    // 作用: 在 AdminController 中用于实现基础的 CRUD
    protected string $serviceName = VipService::class;

    // 页面路径, 包括
    //     - 列表页
    //     - 添加页面/添加数据接口请求地址
    //     - 修改页面/修改数据接口请求地址
    //     - 详情页面/详情接口
    // 以上地方都需要这个 queryPath 来生成
    // 具体的使用方式可以自行查看 Slowlyo\SlowAdmin\Traits\QueryPath.php
    // 一般来说不用修改
    protected string $queryPath = 'vips';

    // 代码生成器中填写的功能名称
    // 用作页面标题
    protected string $pageTitle = '会员管理';

    // 该方法实现了列表页的显示, 以及获取列表数据
    public function index(): JsonResponse|JsonResource
    {
        // 返回列表数据
        if ($this->actionOfGetData()) {
            // 此处的->query() 等效于 AdminRole::query()
                $items = $this->service
                    ->query()
                    ->orderBy('id', 'desc')
                    ->paginate(request()->query('perPage', 20))
                    ->items();


            $total = $this->service->query()->count();

            // amis 的 crud 组件需要的两个参数
            return $this->response()->success(compact('items', 'total'));
        }

        // 返回页面结构
        return $this->response()->success($this->list());
    }

    // 列表页的页面结构
    public function list()
    {
        // ->baseCRUD() 在AdminController 中
        // 对一些基础的页面配置作了封装
        $crud = $this->baseCRUD()
            // 假如你想单独设置列表页的标题
            // 可以在此处再次调用 ->title() 方法, 他会覆盖 baseCRUD() 中的设置
            // ->title('Title')

            // 是否展示筛选折叠按钮
            ->filterTogglable(false)
            // 列表筛选部分表单

            // 这是数据列
            ->columns([
                Column::make()->label('ID')->name('id')->sortable(true),
                Column::make()->label('名称')->name('title'),
                Column::make()->label('金额')->name('pay_amount'),
                Column::make()->label('描述')->name('description'),
                Column::make()->label('等级')->name('level'),
                Column::make()->label('天数')->name('end_time'),
                Column::make()->label('限制发送次数')->name('limit_send'),
                Column::make()->label('限制绘画次数')->name('limit_draw'),

                Column::make()->label('创建时间')->name('created_at')->type('datetime')->sortable(true),
                Column::make()->label('更新时间')->name('updated_at')->type('datetime')->sortable(true),
                // 这个方法会添加操作列
                // 默认会生成 ->rowActions()

                $this->rowActionsOnlyEditAndDelete(),
            ]);

        // baseList() 封装了基础的 Page 以及默认的新增按钮
        return $this->baseList($crud);
    }

    // 表单页面结构 (新增/编辑)
    public function form()
    {
        return $this->baseForm()->body([
            TextControl::make()->label('标题')->name('title')->required(true),
            TextControl::make()->label('金额')->name('pay_amount')->required(true),
            TextControl::make()->label('描述')->name('description'),
            TextControl::make()->label('等级')->name('level')->required(true),
            TextControl::make()->label('天数')->name('end_time')->required(true),
            TextControl::make()->label('限制发送次数')->name('limit_send')->required(true),
            TextControl::make()->label('限制绘画次数')->name('limit_draw')->required(true),

        ]);
    }

    //public function edit($id)
    //{
    //    $ais = $this->service->query()->where('id', $id)->first();
    //
    //    $user = User::where('id', $ais->user_id)->first();
    //
    //    return $this->baseForm($id)->api($this->getStorePath())->body([
    //        //SelectControl::make()->label('用户id')->name('user_id')->searchable(true)->required(true)->options(function () {
    //        //    $users = User::all();
    //        //    $options = [];
    //        //    foreach ($users as $user) {
    //        //        $options[] = [
    //        //            'label' => $user->name,
    //        //            'value' => $user->id,
    //        //        ];
    //        //    }
    //        //    return $options;
    //        //})->value($ais->user_id),
    //        TextControl::make()->label('用户id')->name('user_id')->required(true)->value($user->id),
    //        TextControl::make()->label('问题')->name('question')->required(true)->value($ais->question),
    //        TextControl::make()->label('答案')->name('message')->value($ais->message)->required(true),
    //
    //    ]);
    //
    //}


    // 详情页面结构
    public function detail($id)
    {
        // 此处 baseDetail() 需要传入 id , 用于构成获取数据的 api地址
        return $this->baseDetail($id)->body([]);
    }

    public function store(Request $request)
    {

        $vip = new Vip();
        $vip->title = $request->input('title');
        $vip->pay_amount = $request->input('pay_amount');
        $vip->description = $request->input('description');
        $vip->level = $request->input('level');
        $vip->end_time = $request->input('end_time');
        $vip->limit_send = $request->input('limit_send');
        $vip->limit_draw = $request->input('limit_draw');
        $vip->save();
        return $this->response()->success(['id' => $vip,'status' => 0],'添加成功');

    }

    public function destroy($id){
        if(Vip_meta::where('vip_id',$id)->first()){
            return $this->response()->fail('删除失败,存在该会员的用户');
        }
        $vip = Vip::find($id);
        $vip->delete();
        return $this->response()->success(['status' => 0],'删除成功');
    }

}
