<?php

namespace App\Http\Middleware;

use Symfony\Component\HttpFoundation\Response;
use Laravel\Passport\Http\Middleware\CreateFreshApiToken as BasePassport;

class CreateFreshApiToken extends BasePassport {

    /**
     * Determine if the request should receive a fresh token.
     * Custom here to send the token on POST request as well.
     *
     * @param  \Symfony\Component\HttpFoundation\Response  $request
     * @return bool
     */
    protected function requestShouldReceiveFreshToken($request)
    {
        return in_array($request->getMethod(), array('GET', 'POST')) && 
                    $request->user($this->guard);
    }

    /**
     * Determine if the response should receive a fresh token.
     *
     * @param  \Symfony\Component\HttpFoundation\Response  $response
     * @return bool
     */
    protected function responseShouldReceiveFreshToken($response)
    {
        return $response instanceof Response &&
                    ! $this->alreadyContainsToken($response);
    }

}