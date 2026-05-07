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

	public function createMeeting(int $providerId, int $receiverId, string $topic, string $when, string $where, string $timeStart, string $timeEnd)
	{
		$params =
		[
			'provider_id' => $providerId,
			'receiver_id' => $receiverId,
			'topic'       => $topic,
			'when'        => $when,
			'where'       => $where,
			'time_start'  => $timeStart,
			'time_end'    => $timeEnd
		];

		$this->db->query("
			INSERT INTO `meetings`
			(`provider_id`, `receiver_id`, `topic`, `when`, `where`, `time_start`, `time_end`) VALUES
			(:provider_id:, :receiver_id:, :topic:, :when:, :where:, :time_start:, :time_end:)
		", $params);
	}
}