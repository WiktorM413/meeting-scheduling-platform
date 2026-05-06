<?php

namespace App\Models;

use CodeIgniter\Model;

class MeetingsModel extends Model
{
	public function getAllMeetings()
	{
		$result = $this->db->query("
			SELECT * FROM `meetings`
		");

		return $result->getResultArray();
	}

	public function getAllMeetingsForUser(int $userId)
	{
		$result = $this->db->query("
			SELECT * FROM `meetings`
			WHERE	`provider_id` = :user_id: OR
					`receiver_id` = :user_id:
		", ['user_id' => $userId]);

		return $result->getResultArray();
	}
}