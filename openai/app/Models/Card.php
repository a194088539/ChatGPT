<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Slowlyo\OwlAdmin\Models\BaseModel as Model;

class Card extends Model
{
    use SoftDeletes;

    protected $table = 'card';

    
    
}
