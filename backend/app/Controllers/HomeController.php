<?php

namespace App\Controllers;

class HomeController extends BaseController
{
	public function index()
	{
		return $this->response->setJSON
		([
			'message' => 'Hello from CI4 API',
			'status'  => 'ok'
		]);
	}

	public function register()
	{
		return $this->response->setJSON
		([
			'error' => false,
		]);
	}
}