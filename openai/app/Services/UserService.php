<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/5   19:16
 */
namespace App\Services;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Slowlyo\OwlAdmin\Services\AdminService;

class UserService extends AdminService{
    protected string $modelName = User::class;

    public function count(Request $request)
    {
        $user = User::count();
        return $user;
    }
}
