<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/7   2:35
 */
namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class Invite_meta extends Model
{
    protected $table = 'invite_meta';

    public function invite_user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }
}
