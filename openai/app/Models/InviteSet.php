<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Slowlyo\OwlAdmin\Models\BaseModel as Model;

class InviteSet extends Model
{
    use SoftDeletes;

    protected $table = 'invite_set';

    public function vip()
    {
        return $this->belongsTo(Vip::class, 'invite_vip_id')->select('id','title');
    }

}
