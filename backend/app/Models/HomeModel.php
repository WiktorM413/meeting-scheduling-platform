<?php

namespace App\Model;

use CodeIgniter\Model;

class HomeModel extends Model
{
	public function createUser($firstname, $lastname, $email, $password, $group = 1)
	{
		$params = [];
		$params[] = ["first_name" => $firstname];
		$params[] = ["last_name"  => $lastname];
		$params[] = ["email"      => $email];
		$params[] = ["password"   => $password];
		$params[] = ["group"      => $group];

		$this->db->query("
			INSERT INTO `users`
				(`id`, `first_name`, `last_name`, `email`, `password`, `group`)
				VALUES
				(:first_name:, :last_name:, :email:, :password:, :group:)
		", $params);
	}
}