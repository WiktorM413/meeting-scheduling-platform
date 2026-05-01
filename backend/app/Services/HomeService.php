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

	public function register($firstname, $lastname, $email, $password, $userGroup = 0)
	{
		$this->homeModel->createUser($firstname, $lastname, $email, $password, $userGroup);
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

	public function hashPassword($password)
	{
		return password_hash($password, PASSWORD_DEFAULT);
	}
}
