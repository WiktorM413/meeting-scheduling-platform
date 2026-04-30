<?php

namespace App\Services;

use App\Models\HomeModel;
use App\Validation\ValidationRules;

class HomeService
{
	protected HomeModel $homeModel;

	public function __construct()
	{
		$this->homeModel = model(HomeModel::class);
	}

	public function userExists($email): bool
	{
		return count($this->homeModel->getUserByEmail($email)) > 0;
	}

	public function register($firstname, $lastname, $email, $password)
	{
		
	}

	public function constructRegisterRules()
	{
		$mergedRules = array_merge(
			ValidationRules::firstname,
			ValidationRules::lastname,
			ValidationRules::email,
			ValidationRules::password,
		);

		return $mergedRules;
	}
}
