<?php

namespace App\Services;

use App\Models\Card;
use Slowlyo\OwlAdmin\Services\AdminService;

/**
 * @method Card getModel()
 * @method Card|\Illuminate\Database\Query\Builder query()
 */
class CardService extends AdminService
{
    protected string $modelName = Card::class;
}
