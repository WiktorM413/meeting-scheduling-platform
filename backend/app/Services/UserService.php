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

	public function getUserById(int $userId)
	{
		$user = $this->userModel->getUserById($userId);

		return DataJson(false, 'Successflly retrieved user', $user);
	}

	public function getUserStats(int $userId)
	{
		$stats = $this->userModel->getUserStats($userId);

		return DataJson(false, 'Successflly retrieved user stats', $stats);
	}

	public function updateUser(string|null $profilePic, string|null $firstname, string|null $lastname, string|null $email)
	{
		$this->userModel->updateUser($profilePic, $firstname, $lastname, $email);

		return SimpleJson(false, "Successfully updated a user");
	}
}