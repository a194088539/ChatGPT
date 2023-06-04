<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/5   19:16
 */
namespace App\Services;

use App\Models\Ai_draw;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Slowlyo\OwlAdmin\Services\AdminService;

class DrawService extends AdminService{
    protected string $modelName = Ai_draw::class;
}
