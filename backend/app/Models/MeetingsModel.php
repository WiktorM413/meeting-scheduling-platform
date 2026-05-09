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
			SELECT
				m.unique_id,
				m.provider_id,
				m.receiver_id,
				m.time_end,
				m.time_start,
				m.topic,
				m.when,
				GROUP_CONCAT(CONCAT(u.first_name, ' ', u.last_name) SEPARATOR ', ') AS other_names
		FROM meetings m
		JOIN users u
			ON
			(
				(m.provider_id = :user_id: AND u.id = m.receiver_id)
				OR
				(m.receiver_id = :user_id: AND u.id = m.provider_id)
			)
		WHERE 30 IN (m.provider_id, m.receiver_id)
		GROUP BY
			m.when,
			m.time_start,
			m.time_end,
			m.topic;
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