<?php

namespace App\Models;

use CodeIgniter\Model;

class AuthModel extends Model
{
	public function createUser($firstname, $lastname, $email, $password, $userGroup)
	{
		$params = [
			"first_name" => $firstname,
			"last_name"  => $lastname,
			"email"      => $email,
			"password"   => $password,
			"user_group" => $userGroup
		];

		$this->db->query("
			INSERT INTO `users`
				(`first_name`, `last_name`, `email`, `password`, `user_group`)
				VALUES
				(:first_name:, :last_name:, :email:, :password:, :user_group:)
		", $params);

		return $this->getInsertID();
	}

	public function getUserByEmail($email)
	{
		$result = $this->db->query("
			SELECT * FROM users
			WHERE email = ?
			LIMIT 1
		", [$email]);

		return count($result->getResultArray()) > 0 ? $result->getResultArray()[0] : null;
	}
}