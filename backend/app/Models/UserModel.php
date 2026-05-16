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

	public function getUserStats($userId)
	{
		$result = $this->db->query("
			SELECT * FROM user_stats
			WHERE user_id = ?
			LIMIT 1
		", [$userId]);

		$resultArr = $result->getResultArray();

		return $this->FirstOrNull($result->getResultArray());
	}
}