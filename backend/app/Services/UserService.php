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

	public function updateUser(int $userId, string|null $profilePic = null, string|null $firstname = null, string|null $lastname = null, string|null $email = null, bool $removeProfilePic)
	{
		$this->userModel->updateUser($userId, $profilePic, $firstname, $lastname, $email, $removeProfilePic);

		return SimpleJson(false, "Successfully updated a user");
	}
}