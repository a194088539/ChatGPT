<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/5   19:16
 */
namespace App\Services;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Slowlyo\OwlAdmin\Services\AdminService;

class OrderService extends AdminService{
    protected string $modelName = Order::class;
}
