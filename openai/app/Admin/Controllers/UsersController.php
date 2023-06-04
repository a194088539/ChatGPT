<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/5   18:54
 */
namespace App\Admin\Controllers;

use App\Models\Ai_draw;
use App\Models\Invite_meta;
use App\Models\Message;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use App\Models\Vip;
use App\Models\Vip_meta;
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
use Slowlyo\OwlAdmin\Renderers\TextControl;
use Slowlyo\OwlAdmin\Renderers\Wrapper;
use Slowlyo\OwlAdmin\Renderers\InputKV;
use Slowlyo\OwlAdmin\Controllers\AdminController;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersController extends AdminController{

    // 功能对应的Service
    // 作用: 在 AdminController 中用于实现基础的 CRUD
    protected string $serviceName = UserService::class;

    // 页面路径, 包括
    //     - 列表页
    //     - 添加页面/添加数据接口请求地址
    //     - 修改页面/修改数据接口请求地址
    //     - 详情页面/详情接口
    // 以上地方都需要这个 queryPath 来生成
    // 具体的使用方式可以自行查看 Slowlyo\SlowAdmin\Traits\QueryPath.php
    // 一般来说不用修改
    protected string $queryPath = 'users';

    // 代码生成器中填写的功能名称
    // 用作页面标题
    protected string $pageTitle = '用户管理';

    // 该方法实现了列表页的显示, 以及获取列表数据

    public function index(): JsonResponse|JsonResource
    {
        // 返回列表数据
        if ($this->actionOfGetData()) {
            // 此处的->query() 等效于 AdminRole::query()
            if (request()->query('name')){
                $items = $this->service
                    ->query()
                    ->where('name', 'like', "%".request()->query('name')."%")
                    ->with('vip_info')
                    ->orderBy('id', 'desc')

                    ->paginate(request()->query('perPage', 20))
                    ->items();
            }else if (request()->query('email')){
                $items = $this->service
                    ->query()
                    ->where('email', 'like', "%".request()->query('email')."%")
                    ->with('vip_info')
                    ->orderBy('id', 'desc')

                    ->paginate(request()->query('perPage', 20))
                    ->items();
            }else{
                $items = $this->service
                    ->query()
                    ->with('vip_info')
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
        $helpers = [
            'ternary' => function($cond, $true, $false) {
                return $cond ? $true : $false;
            }
        ];
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
                TextControl::make()->name('name')->label('名称'),
                TextControl::make()->name('email')->label('邮箱')
            ]))
            // 这是数据列
            ->columns([
                Column::make()->label('ID')->name('id')->sortable(true),
                Column::make()->label('名称')->name('name'),
                Column::make()->label('头像')->name('avatar')->type('image')->width(50)->height(50),
                Column::make()->label('邮箱')->name('email'),
                Column::make()->label('余额')->name('money'),
                //增加会员列，判断vip_info是否为空
                Column::make()->label('会员')->name('vip_info.vip_s.title'),
                Column::make()->label('邀请码')->name('invite_code'),

                Column::make()->label('创建时间')->name('created_at')->type('datetime')->sortable(true),
                Column::make()->label('更新时间')->name('updated_at')->type('datetime')->sortable(true),
                // 这个方法会添加操作列
                // 默认会生成 ->rowActions()
                $this->rowActionsOnlyEditAndDelete(),
            ]);

        // baseList() 封装了基础的 Page 以及默认的新增按钮
        return $this->baseList($crud);
    }

    public function send_i(){
        return '有';
    }

    // 表单页面结构 (新增/编辑)
    public function form()
    {
        $vip = Vip::all();
        return $this->baseForm()->data($vip)->body([
            Image::make()->label('头像')->name('avatar')->type('input-image')->uploadUrl('/api/uploads')->required(true),
            TextControl::make()->label('名称')->name('name')->required(true),
            TextControl::make()->label('邮箱')->name('email')->required(true),
            TextControl::make()->label('密码')->name('password')->type('input-password')->required(false),
            TextControl::make()->label('余额')->name('money')->required(true),
            SelectControl::make()->label('会员')->name('vip_id')->options($this->getOptions($vip))->value(),

        ]);
    }

    public function edit($id)
    {
        $vip = Vip::all();
        $vip_meta = Vip_meta::where('user_id', $id)->first();
        $user = User::find($id);
        if ($vip_meta){
            $vip_id = $vip_meta->vip_id;
        }else{
            $vip_id = 0;
        }
        return $this->baseForm()->api(['url'=>'/users/'.$id.'/edit','method'=>'put'
        ])->data($vip)->body([
            Image::make()->label('头像')->name('avatar')->type('input-image')->uploadUrl('/api/uploads')->required(true)->value($user->avatar),
            TextControl::make()->label('ID')->name('id')->required(true)->value($user->id)->hidden(true),
            TextControl::make()->label('名称')->name('name')->required(true)->value($user->name),
            TextControl::make()->label('邮箱')->name('email')->required(true)->value($user->email),
            TextControl::make()->label('密码')->name('password')->type('input-password')->required(false),
            TextControl::make()->label('余额')->name('money')->required(true)->value($user->money),
            SelectControl::make()->label('会员')->name('vip_id')->options($this->getOptions($vip))->value($vip_id),
            TextControl::make()->label('会员天数+')->name('vip_day'),

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

    // 详情页面结构
    public function detail($id)
    {
        // 此处 baseDetail() 需要传入 id , 用于构成获取数据的 api地址
        return $this->baseDetail($id)->body([]);
    }

    public function store(Request $request)
    {
        $is_local = Setting::where('option_name','is_localhost')->first()->option_value;
        if ($request->file('file')){
            $request->validate([
                'file' => 'required|image',
            ],
                [
                    'file.required' => '头像不能为空',
                    'file.image' => '头像格式不正确',
                ]
            );
            if ($is_local == '1'){
                $files = $request->file('file');
                $path = '/' . date("Ym/d", time());
                $disk = Storage::disk('public');
                $path = $disk->put($path, $files);
                $new_img  = $disk->url($path);
            }else{
                $files = $request->file('file');
                $path = '/' . date("Ym/d", time());
                $disk = Storage::disk('oss');
                $path = $disk->put($path, $files);
                $new_img  = $disk->url($path);
            }
            return $this->response()->success(['value' => $new_img],'添加成功');

        }

        $request->validate([
            'email' => 'required|email|unique:users,email',
        ],
            [
                'email.required' => '邮箱不能为空',
                'email.email' => '邮箱格式不正确',
                'email.unique' => '邮箱已存在',
            ]
        );
        $user = new User;
        $user->avatar = $request->input('avatar');
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if ($request->input('password')!==''){
            $user->password = Hash::make($request->input('password'));
        }
        $user->money = $request->input('money');
        $user->save();
        if ($request->input('vip_id')!=''){
            if (Vip_meta::where('user_id',$user->id)->first()){
                $vip_meta = Vip_meta::where('user_id',$user->id)->first();
                $vip_meta->vip_id = $request->input('vip_id');
                $vip = Vip::where('id',$request->input('vip_id'))->first();
                $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time."+".$vip->end_time." day"));
                $vip_meta->save();
                return $this->response()->success(['id' => $user,'status' => 1],'添加成功');
            }else{
                $new_vip_meta = new Vip_meta();
                $new_vip_meta->user_id = $user->id;
                $new_vip_meta->vip_id = $request->input('vip_id');
                $vip = Vip::where('id',$request->input('vip_id'))->first();
                $new_vip_meta->expire_time = date('Y-m-d H:i:s',strtotime("+".$vip->end_time." day"));
                $new_vip_meta->save();
            }

        }
        return $this->response()->success(['id' => $user,'status' => 0],'添加成功');

    }

    public function update(Request $request)
    {
        $is_local = Setting::where('option_name','is_localhost')->first()->option_value;
        if ($request->file('file')){
            $request->validate([
                'file' => 'required|image',
            ],
                [
                    'file.required' => '头像不能为空',
                    'file.image' => '头像格式不正确',
                ]
            );
            if ($is_local == '1'){
                $files = $request->file('file');
                $path = '/' . date("Ym/d", time());
                $disk = Storage::disk('public');
                $path = $disk->put($path, $files);
                $new_img  = $disk->url($path);
            }else{
                $files = $request->file('file');
                $path = '/' . date("Ym/d", time());
                $disk = Storage::disk('oss');
                $path = $disk->put($path, $files);
                $new_img  = $disk->url($path);
            }
            return $this->response()->success(['value' => $new_img],'添加成功');

        }



        $request->validate([
            'email' => 'required|email',
        ],
            [
                'email.required' => '邮箱不能为空',
                'email.email' => '邮箱格式不正确',
            ]
        );
        $user = User::find($request->input('id'));
        $user->avatar = $request->input('avatar');
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if ($request->input('password')!==''){
            $user->password = Hash::make($request->input('password'));
        }
        $user->money = $request->input('money');
        $user->save();
        if ($request->input('vip_id')!=''){
            if (Vip_meta::where('user_id',$user->id)->first()){
                if ($request->input('vip_id')==0){
                    $vip_meta = Vip_meta::where('user_id',$user->id)->first();
                    $vip_meta->delete();
                }else{
                    $vip_meta = Vip_meta::where('user_id',$user->id)->first();
                    $vip_meta->vip_id = $request->input('vip_id');
                    if ($request->input('vip_day')!=''){
                        $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time."+".$request->input('vip_day')." day"));
                    }else{
                        $vip = Vip::where('id',$request->input('vip_id'))->first();
                        $vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($vip_meta->expire_time."+".$vip->end_time." day"));
                    }
                    $vip_meta->save();
                }

            }else{
                if ($request->input('vip_id')!=0){
                    $new_vip_meta = new Vip_meta();
                    $new_vip_meta->user_id = $user->id;
                    $new_vip_meta->vip_id = $request->input('vip_id');
                    if ($request->input('vip_day')!=''){
                        $new_vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($new_vip_meta->expire_time."+".$request->input('vip_day')." day"));
                    }else{
                        $vip = Vip::where('id',$request->input('vip_id'))->first();
                        $new_vip_meta->expire_time = date('Y-m-d H:i:s',strtotime($new_vip_meta->expire_time."+".$vip->end_time." day"));
                    }
                    $new_vip_meta->save();
                }
            }
        }

        return $this->response()->success(['id' => $user,'status' => 0],'保存成功');

    }

    public function destroy($id){
        $user = User::find($id);
        $user->delete();
        $vip_meta = Vip_meta::where('user_id',$id)->first();
        if ($vip_meta){
            $vip_meta->delete();
        }
        $message = Message::where('user_id',$id)->first();
        if ($message){
            $message->delete();
        }
        $order = Order::where('user_id',$id)->first();
        if ($order){
            $order->delete();
        }
        $draw = Ai_draw::where('user_id',$id)->first();
        if ($draw){
            $draw->delete();
        }
        $invite_meta = Invite_meta::where('user_id',$id)->first();
        if ($invite_meta){
            $invite_meta->delete();
        }

        return $this->response()->success(['status' => 0],'删除成功');
    }

}
