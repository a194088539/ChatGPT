<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/4   20:33
 */
namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class Ai_draw extends Model
{
    protected $table = 'ai_draw';
    protected $primaryKey = 'id';
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }

    public function getPublicAttribute($value)
    {
        return $value ? true : false;
    }

    // 定义修改器，将前端传递的值转换为数据库需要的值
    public function setPublicAttribute($value)
    {
        $this->attributes['public'] = $value ? 1 : 0;
    }
}
