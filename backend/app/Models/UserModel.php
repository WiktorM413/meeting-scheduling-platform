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

	public function getUserById(int $userId)
	{
		$result = $this->db->query("
			SELECT * FROM users
			WHERE id = ?
			LIMIT 1
		", [$userId]);

		return $result->getResultArray()[0];
	}

	public function getUserStats($userId)
	{
		$result = $this->db->query("
			SELECT * FROM user_stats
			WHERE user_id = ?
			LIMIT 1
		", [$userId]);

		return $result->getResultArray()[0];
	}
}