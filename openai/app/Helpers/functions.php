<?php
/**
 * Class ${NAME}
 * @author: Carefree
 * @email: 869375583@qq.com
 * @Time: 2023/3/6   0:37
 */



function updateEnv($data = array())
{
    $envPath = base_path() . DIRECTORY_SEPARATOR . '.env';

    $contentArray = collect(file($envPath, FILE_IGNORE_NEW_LINES));

    $contentArray->transform(function ($item) use ($data){
        foreach ($data as $key => $value){
            if(str_contains($item, $key)){
                return $key . '=' . $value;
            }
        }

        return $item;
    });

    $content = implode("\n",$contentArray->toArray());

    \File::put($envPath, $content);
}
