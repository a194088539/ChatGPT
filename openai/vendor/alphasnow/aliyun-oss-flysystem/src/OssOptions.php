<?php

namespace AlphaSnow\Flysystem\Aliyun;

use League\Flysystem\Config;
use OSS\OssClient;

class OssOptions
{
    /**
     * @var array
     */
    protected $options;

    /**
     * @param array $options
     */
    public function __construct(array $options)
    {
        $this->options = $options;
    }

    /**
     * @return array
     */
    public function getOptions(): array
    {
        return $this->options;
    }

    /**
     * @param array $options
     * @return OssOptions
     */
    public function setOptions(array $options): OssOptions
    {
        $this->options = $options;
        return $this;
    }

    /**
     * @param Config $config
     * @return array
     */
    public function mergeConfig(Config $config, VisibilityConverter $visibilityConverter = null): array
    {
        $options = $config->get("options", []);

        if ($headers = $config->get("headers")) {
            $options[OssClient::OSS_HEADERS] = isset($options[OssClient::OSS_HEADERS]) ? array_merge($options[OssClient::OSS_HEADERS], $headers) : $headers;
        }

        if ($visibility = $config->get("visibility")) {
            is_null($visibilityConverter) && $visibilityConverter = new VisibilityConverter();
            $options[OssClient::OSS_HEADERS][OssClient::OSS_OBJECT_ACL] = $visibilityConverter->visibilityToAcl($visibility);
        }

        return array_merge_recursive($this->options, $options);
    }
}
