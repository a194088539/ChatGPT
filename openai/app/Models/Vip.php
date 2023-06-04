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

class Vip extends Model{
    protected $table = 'vips';
    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format($this->dateFormat ?: 'Y-m-d H:i:s');
    }

}
