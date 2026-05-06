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
}