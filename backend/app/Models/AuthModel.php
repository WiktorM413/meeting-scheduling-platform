<?php

namespace App\Models;


class AuthModel extends BaseModel
{
	public function createUser($firstname, $lastname, $email, $password)
	{
		$params = [
			"first_name" => $firstname,
			"last_name"  => $lastname,
			"email"      => $email,
			"password"   => $password,
		];

		$this->db->query("
			INSERT INTO `users`
				(`first_name`, `last_name`, `email`, `password`, `profile_pic`)
				VALUES
				(:first_name:, :last_name:, :email:, :password:, NULL)
		", $params);

		return $this->getUserByEmail($email)['id'];
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