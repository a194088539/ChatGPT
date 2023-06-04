<?php

namespace App\Services;

use App\Models\Setting;
use Slowlyo\OwlAdmin\Services\AdminService;

/**
 * @method Setting getModel()
 * @method Setting|\Illuminate\Database\Query\Builder query()
 */
class SettingService extends AdminService
{
    protected string $modelName = Setting::class;
}
