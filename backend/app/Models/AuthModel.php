<?php

namespace App\Models;


class AuthModel extends BaseModel
{
	public function createUser($firstname, $lastname, $email, $password)
	{
		$this->db->query("
		INSERT INTO users
			(first_name, last_name, email, password, profile_pic)
		VALUES
			(?, ?, ?, ?, NULL)",
		[
			$firstname,
			$lastname,
			$email,
			$password
		]);

		$userId = $this->db->insertID();

		$this->db->query("
			INSERT INTO `user_settings`
				(user_id)
				VALUES
				(:user_id:)
		", ["user_id" => $userId]);

		return $userId;
	}

	public function getUserByEmail($email)
	{
		$result = $this->db->query("
			SELECT * FROM users
			WHERE email = ?
			LIMIT 1
		", [$email]);

		return $this->FirstOrNull($result->getResultArray());
	}
}