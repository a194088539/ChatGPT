<?php

namespace AlphaSnow\Flysystem\Aliyun;

use League\Flysystem\Filesystem;
use OSS\OssClient;

class AliyunFactory
{
    /**
     * @param array $config
     * @param OssClient|null $client
     * @return AliyunAdapter
     */
    public function createAdapter(array $config, OssClient $client = null): AliyunAdapter
    {
        is_null($client) && $client = $this->createClient($config);
        return new AliyunAdapter($client, $config["bucket"], $config["prefix"] ?? "", $config);
    }

    /**
     * @param array $config
     * @param OssClient|null $client
     * @return Filesystem
     */
    public function createFilesystem(array $config, OssClient $client = null): Filesystem
    {
        return new Filesystem($this->createAdapter($config, $client));
    }

    /**
     * @param array $config
     * @return OssClient
     * @throws \OSS\Core\OssException
     */
    public function createClient(array $config): OssClient
    {
        $ossEndpoint = (new UrlGenerator($config))->getOssEndpoint();
        $client = new OssClient($config["access_key_id"], $config["access_key_secret"], $ossEndpoint, $config["is_cname"] ?? false, $config["security_token"] ?? null, $config["request_proxy"] ?? null);
        isset($config["use_ssl"]) && !is_null($config["use_ssl"]) && $client->setUseSSL($config["use_ssl"]);
        isset($config["max_retries"]) && !is_null($config["max_retries"]) && $client->setMaxTries($config["max_retries"]);
        isset($config["enable_sts_in_url"]) && !is_null($config["enable_sts_in_url"]) && $client->setSignStsInUrl($config["enable_sts_in_url"]);
        isset($config["timeout"]) && !is_null($config["timeout"]) && $client->setTimeout($config["timeout"]);
        isset($config["connect_timeout"]) && !is_null($config["connect_timeout"]) && $client->setConnectTimeout($config["connect_timeout"]);
        return $client;
    }
}
