<?php

namespace App\Models;

use CodeIgniter\Model;

class HomeModel extends Model
{
	public function createUser($firstname, $lastname, $email, $password, $userGroup = 0)
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

		return $this->db->affectedRows();
	}
}