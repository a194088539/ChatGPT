<?php

namespace App\Services;

use App\Models\InviteSet;
use Slowlyo\OwlAdmin\Services\AdminService;

/**
 * @method InviteSet getModel()
 * @method InviteSet|\Illuminate\Database\Query\Builder query()
 */
class InviteSetService extends AdminService
{
    protected string $modelName = InviteSet::class;
}
