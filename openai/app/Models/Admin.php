<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/3   15:04
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
class Admin extends AuthUser
{
    use HasApiTokens;
    protected $table = 'admin';
}
