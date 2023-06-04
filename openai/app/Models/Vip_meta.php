<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/2   17:28
 */
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class Vip_meta extends Model{
    protected $table = 'vip_meta';
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }


    public function vip_s()
    {
        return $this->hasOne(Vip::class, 'id', 'vip_id')->select('id','title');
    }

}
