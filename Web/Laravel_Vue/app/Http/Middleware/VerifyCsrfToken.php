<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/singup_app',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/signup_app',
        '/login_app',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/login_app',
        '/app_eaten',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/app_eaten',
        '/eaten_data',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/eaten_data',
        '/get_store_data',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/get_store_data',
        '/get_store_id',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/get_store_id',
        '/gps',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/gps',
        '/user',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/user',
        '/start',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/start',
        '/end',
        'http://ec2-34-239-220-61.compute-1.amazonaws.com/end',
    ];
}
