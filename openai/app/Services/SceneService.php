<?php

namespace App\Services;

use App\Models\Scene;
use Slowlyo\OwlAdmin\Services\AdminService;

/**
 * @method Scene getModel()
 * @method Scene|\Illuminate\Database\Query\Builder query()
 */
class SceneService extends AdminService
{
    protected string $modelName = Scene::class;
}
