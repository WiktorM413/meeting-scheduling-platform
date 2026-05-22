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

	public function getProfilePic(int $userId)
	{
		$result = $this->db->query("
			SELECT `profile_pic` FROM `users`
			WHERE id = ?
			LIMIT 1
		", [$userId]);

		return $this->FirstOrNull($result->getResultArray());
	}
	
	public function getUserSettings(int $userId)
	{
		$result = $this->db->query("
			SELECT * FROM `user_settings`
			WHERE `user_id` = :user_id:
			LIMIT 1
		", ["user_id" => $userId]);

		return $this->FirstOrNull($result->getResultArray());
	}
	
	public function updateUser(int $userId, string|null $profilePic, string|null $firstname, string|null $lastname, string|null $email, bool $removeProfilePic)
	{
		$params =
		[
			'user_id'            => $userId,
			'first_name'         => $firstname,
			'last_name'          => $lastname,
			'email'              => $email,
			'profile_pic'        => $profilePic,
			'remove_profile_pic' => $removeProfilePic
		];

		$this->db->query("
			UPDATE users SET
				`first_name`  = COALESCE(:first_name:, `first_name`),
				`last_name`   = COALESCE(:last_name:,  `last_name`),
				`email`       = COALESCE(:email:,      `email`),
				`profile_pic` =
					CASE
						WHEN :remove_profile_pic: = 1 THEN NULL
						ELSE COALESCE(:profile_pic:, `profile_pic`)
					END
			WHERE id = :user_id:
		", $params);
	}

	public function updateUserSettings(int $userId, int|null $publicProfile, int|null $showEmail)
	{
		$params =
		[
			"public_profile" => $publicProfile,
			"show_email"     => $showEmail,
			"user_id"        => $userId
		];
		
		$this->db->query("
			UPDATE `user_settings` SET
				`public_profile` = COALESCE(:public_profile:, `public_profile`),
				`show_email`     = COALESCE(:show_email:,     `show_email`)
			WHERE user_id = :user_id:
		", $params);
	}

	public function updatePassword(int $userId, string $newPasswordHash)
	{
		$params =
		[
			"user_id"      => $userId,
			"new_password" => $newPasswordHash
		];

		$this->db->query("
			UPDATE users SET
				password = :new_password:
			WHERE id = :user_id:
		", $params);
	}
}