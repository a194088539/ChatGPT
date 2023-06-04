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
use App\Services\AiService;
use App\Services\DrawService;
use App\Services\OrderService;
use App\Services\UserService;
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

class OrderController extends AdminController{

    // 功能对应的Service
    // 作用: 在 AdminController 中用于实现基础的 CRUD
    protected string $serviceName = OrderService::class;

    // 页面路径, 包括
    //     - 列表页
    //     - 添加页面/添加数据接口请求地址
    //     - 修改页面/修改数据接口请求地址
    //     - 详情页面/详情接口
    // 以上地方都需要这个 queryPath 来生成
    // 具体的使用方式可以自行查看 Slowlyo\SlowAdmin\Traits\QueryPath.php
    // 一般来说不用修改
    protected string $queryPath = 'orders';

    // 代码生成器中填写的功能名称
    // 用作页面标题
    protected string $pageTitle = '订单管理';

    // 该方法实现了列表页的显示, 以及获取列表数据
    public function index(): JsonResponse|JsonResource
    {
        // 返回列表数据
        if ($this->actionOfGetData()) {
            // 此处的->query() 等效于 AdminRole::query()
            if (request()->query('order_id')){
                $items = $this->service
                    ->query()
                    ->where('order_id', 'like', "%".request()->query('order_id')."%")
                    ->orderBy('id', 'desc')
                    ->paginate(request()->query('perPage', 20))
                    ->items();
            }else if (request()->query('user_id')){
                $items = $this->service
                    ->query()
                    ->where('user_id', 'like', "%".request()->query('user_id')."%")
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
            ->filter($this->baseFilter()->body([
                // 内容就是 Form 的 body 属性
                // 数据筛选的查询需要再 index() 方法中自行实现
                TextControl::make()->name('order_id')->label('订单编号'),
                TextControl::make()->name('user_id')->label('用户ID')
            ]))
            // 这是数据列
            ->columns([
                Column::make()->label('ID')->name('id')->sortable(true),
                Column::make()->label('订单编号')->name('order_id'),
                Column::make()->label('名称')->name('title'),
                Column::make()->label('金额')->name('amount'),
                Column::make()->label('用户ID')->name('user_id'),
                Column::make()->label('用户余额')->name('user_amount'),
                Column::make()->label('状态')->name('status')->type('status'),
                Column::make()->label('购买方式')->name('way')->type('mapping')->map([
                    'alipay' => "<span class='label label-info'>支付宝</span>",
                    'wechat' => "<span class='label label-success'>微信</span>",
                    'money' => '余额',
                ]),
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
            TextControl::make()->label('金额')->name('amount')->required(true),
            TextControl::make()->label('用户ID')->name('user_id')->required(true),
            TextControl::make()->label('用户余额')->name('user_amount')->required(true),

            TextControl::make()->label('状态')->name('status')->type('switch')->required(true),
            SelectControl::make()->label('购买方式')->name('way')->required(true)->options([
                ['label' => '支付宝', 'value' => 'alipay'],
                ['label' => '微信', 'value' => 'wechat'],
            ]),

        ]);
    }

    public function edit($id)
    {
        $ais = $this->service->query()->where('id', $id)->first();


        return $this->baseForm($ais)->api(['url'=>'/orders/'.$id.'/edit','method'=>'put'
        ])->body([
            TextControl::make()->label('ID')->name('id')->required(true)->value($ais->id)->hidden(true),
            TextControl::make()->label('标题')->name('title')->required(true)->value($ais->title)->disabled(true),
            TextControl::make()->label('金额')->name('amount')->required(true)->value($ais->amount)->disabled(true),
            TextControl::make()->label('用户ID')->name('user_id')->required(true)->value($ais->user_id)->disabled(true),
            TextControl::make()->label('用户余额')->name('user_amount')->required(true)->value($ais->user_amount)->disabled(true),

            TextControl::make()->label('状态')->name('status')->type('switch')->required(true)->value($ais->status),
            SelectControl::make()->label('购买方式')->name('way')->required(true)->value($ais->way)->options([
                ['label' => '支付宝', 'value' => 'alipay'],
                ['label' => '微信', 'value' => 'wechat'],
            ]),

        ]);

    }


    // 详情页面结构
    public function detail($id)
    {
        // 此处 baseDetail() 需要传入 id , 用于构成获取数据的 api地址
        return $this->baseDetail($id)->body([]);
    }

    public function store(Request $request)
    {
        $user = User::where('id', $request->input('user_id'))->first();
        if (!$user){
            return $this->response()->error('用户不存在');
        }
        $this->service->create($request->all());
        return $this->response()->success(['id' => $user->id,'status' => 0],'添加成功');

    }

}
