<?php

namespace App\Models;

class UserModel extends BaseModel
{
	public function getAllUsers()
	{
		$result = $this->db->query("
			SELECT * FROM users
		");

		return $result->getResultArray();
	}

	public function getUserById(int $userId)
	{
		$result = $this->db->query("
			SELECT * FROM users
			WHERE id = ?
			LIMIT 1
		", [$userId]);

		return $this->FirstOrNull($result->getResultArray());
	}

	public function getUserStats(int $userId)
	{
		$result = $this->db->query("
			SELECT * FROM user_stats
			WHERE user_id = ?
			LIMIT 1
		", [$userId]);

		return $this->FirstOrNull($result->getResultArray());
	}

	public function updateUser(int $userId, string|null $profilePic, string|null $firstname, string|null $lastname, string|null $email)
	{
		$params =
		[
			"user_id"     => $userId,
			"first_name"  => $firstname,
			"last_name"   => $lastname,
			"email"       => $email,
			"profile_pic" => $profilePic
		];

		$this->db->query("
			UPDATE users SET
				`first_name`  = COALESCE(:first_name:, `first_name`),
				`last_name`   = COALESCE(:last_name:,  `last_name`),
				`email`       = COALESCE(:email:,      `email`),
				`profile_pic` = :profile_pic:
			WHERE id = :user_id:
		", $params);
	}
}