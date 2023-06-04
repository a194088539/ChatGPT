<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/5   19:16
 */
namespace App\Services;

use App\Models\Ai_draw;
use App\Models\Vip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Slowlyo\OwlAdmin\Services\AdminService;

class VipService extends AdminService{
    protected string $modelName = Vip::class;
}
