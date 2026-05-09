<?php

namespace App\Services;

use App\Models\UserModel;

class UserService
{
	protected UserModel $userModel;

	public function __construct()
	{
		$this->userModel = model(UserModel::class);
		helper('response');
	}

	public function getAllUsers()
	{
		$users = $this->userModel->getAllUsers();

		return DataJson(false, "Successfully retrieved all users", $users);
	}

	public function getUserById($userId)
	{
		$user = $this->userModel->getUserById($userId);

		return DataJson(false, 'Successflly retrieved user', $user);
	}
}