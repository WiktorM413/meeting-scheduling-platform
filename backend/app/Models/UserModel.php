<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
	public function getAllUsers()
	{
		$result = $this->db->query("
			SELECT * FROM users
		");

		return $result->getResultArray();
	}
}