<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Configs for Amazon S3 storage
    |--------------------------------------------------------------------------
    */

    'bucket' => env('AWS_BUCKET', null),
    'bucket_link' => env('AWS_BUCKET_LINK', null)
];