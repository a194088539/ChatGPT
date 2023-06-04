# Aliyun OSS Flysystem

💾 Flysystem Adapter for [Aliyun Object Storage Service](https://www.alibabacloud.com/help/en/object-storage-service).

[![Latest Stable Version](https://poser.pugx.org/alphasnow/aliyun-oss-flysystem/v/stable)](https://packagist.org/packages/alphasnow/aliyun-oss-flysystem)
[![Total Downloads](https://poser.pugx.org/alphasnow/aliyun-oss-flysystem/downloads)](https://packagist.org/packages/alphasnow/aliyun-oss-flysystem)
[![License](https://poser.pugx.org/alphasnow/aliyun-oss-flysystem/license)](https://packagist.org/packages/alphasnow/aliyun-oss-flysystem)
[![Test](https://github.com/alphasnow/aliyun-oss-flysystem/workflows/Test/badge.svg?branch=3.x)](https://github.com/alphasnow/aliyun-oss-flysystem/actions?query=branch:3.x)
[![Coverage Status](https://coveralls.io/repos/github/alphasnow/aliyun-oss-flysystem/badge.svg?branch=3)](https://coveralls.io/github/alphasnow/aliyun-oss-flysystem?branch=3)

## Compatibility

| **flysystem**  |  **aliyun-oss-flysystem** | **readme**
|---|---|---|
| ^3.0 | ^3.0  | [readme](https://github.com/alphasnow/aliyun-oss-flysystem/blob/3.x/README.md) |
| ^2.0 | ^2.0  | [readme](https://github.com/alphasnow/aliyun-oss-flysystem/blob/2.x/README.md) |
| ^1.0 | ^1.0  | [readme](https://github.com/alphasnow/aliyun-oss-flysystem/blob/1.x/README.md) |
| ~1.0.0  | ^0.3  | [readme](https://github.com/alphasnow/aliyun-oss-flysystem/blob/0.x/README.md) |

## Installation

```bash
composer require "alphasnow/aliyun-oss-flysystem"
```

## Usage

### Initialize
```php
use OSS\OssClient;
use AlphaSnow\Flysystem\Aliyun\AliyunFactory;

$config = [
    "access_key_id" => "**************",             // Required, YourAccessKeyId
    "access_key_secret" => "********************",   // Required, YourAccessKeySecret
    "endpoint" => "oss-cn-shanghai.aliyuncs.com",    // Required, Endpoint
    "bucket" => "bucket-name",                       // Required, Bucket
];

$flysystem = (new AliyunFactory())->createFilesystem($config);

$flysystem->write("file.md", "contents");
$flysystem->writeStream("foo.md", fopen("file.md", "r"));

$fileExists = $flysystem->fileExists("foo.md");
$flysystem->copy("foo.md", "baz.md");
$flysystem->move("baz.md", "bar.md");
$flysystem->delete("bar.md");
$has = $flysystem->has("bar.md");

$read = $flysystem->read("file.md");
$readStream = $flysystem->readStream("file.md");

$flysystem->createDirectory("foo/");
$directoryExists = $flysystem->directoryExists("foo/");
$flysystem->deleteDirectory("foo/");

$listContents = $flysystem->listContents("/", true);
$listPaths = [];
foreach ($listContents as $listContent) {
    $listPaths[] = $listContent->path();
}

$lastModified = $flysystem->lastModified("file.md");
$fileSize = $flysystem->fileSize("file.md");
$mimeType = $flysystem->mimeType("file.md");

$flysystem->setVisibility("file.md", "private");
$visibility = $flysystem->visibility("file.md");
```

### Options
```php
$flysystem->write("file.md", "contents", [
    "options" => ["checkmd5" => false]
]);
$flysystem->write("bar.md", "contents", [
    "headers" => ["Content-Disposition" => "attachment;filename=bar.md"]
]);
$flysystem->write("baz.md", "contents", [
    "visibility" => "private"
]);
```

## Reference
[https://github.com/thephpleague/flysystem](https://github.com/thephpleague/flysystem)   

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.