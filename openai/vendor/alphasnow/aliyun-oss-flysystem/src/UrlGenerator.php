<?php

namespace AlphaSnow\Flysystem\Aliyun;

class UrlGenerator
{
    /**
     * @var array
     */
    protected array $config = [
        "bucket" => null,
        "endpoint" => null,
        "internal" => null,
        "domain" => null,
        "use_ssl" => false,
        "reverse_proxy" => false,
    ];

    /**
     * @param array $config
     */
    public function __construct(array $config)
    {
        $this->config = array_merge($this->config, $config);
    }

    /**
     * @param string $path
     * @return string
     */
    public function fullUrl(string $path): string
    {
        return $this->getDomain() . "/" . ltrim($path, "/");
    }

    /**
     * @return string
     */
    protected function getDomain(): string
    {
        if ($this->config["domain"]) {
            return $this->getProtocol() . "://" . $this->config["domain"];
        }
        return $this->getEndpointDomain();
    }

    /**
     * @return string
     */
    protected function getEndpointDomain(): string
    {
        return $this->getProtocol() . "://" . $this->config["bucket"] . "." . $this->config["endpoint"];
    }

    /**
     * @return string
     */
    protected function getInternalDomain(): string
    {
        return $this->getProtocol() . "://" . $this->config["bucket"] . "." . $this->config["internal"];
    }

    /**
     * @return string
     */
    protected function getProtocol(): string
    {
        return $this->config["use_ssl"] ? "https" : "http";
    }

    /**
     * @return string
     */
    public function getOssEndpoint(): string
    {
        if ($this->config["internal"]) {
            return $this->config["internal"] ?: "";
        }
        if ($this->config["domain"] && $this->config["reverse_proxy"] == false) {
            return $this->config["domain"] ?: "";
        }
        return $this->config["endpoint"] ?: "";
    }

    /**
     * @param string $url
     * @return string
     */
    public function correctDomain(string $url): string
    {
        if ($this->config["internal"]) {
            return str_replace($this->getInternalDomain(), $this->getDomain(), $url);
        }

        if ($this->config["domain"]) {
            return str_replace($this->getEndpointDomain(), $this->getDomain(), $url);
        }

        return $url;
    }
}
