<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Cors implements FilterInterface
{
	public function before(RequestInterface $request, $arguments = null)
	{
		$response = service('response');

		$response->setHeader('Access-Control-Allow-Origin', 'https://meeting-scheduling-platform.wiktor-markowski362.workers.dev');
		$response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
		$response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
		$response->setHeader('Access-Control-Allow-Credentials', 'true');

		if ($request->getMethod() === 'options') {
			return $response->setStatusCode(200);
		}
	}

	public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
	{
		$response->setHeader('Access-Control-Allow-Origin', 'https://meeting-scheduling-platform.wiktor-markowski362.workers.dev');
		$response->setHeader('Access-Control-Allow-Credentials', 'true');

		return $response;
	}
}