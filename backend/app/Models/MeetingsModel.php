<?php

namespace App\Models;

use CodeIgniter\Model;

class MeetingsModel extends BaseModel
{
	public function getAllMeetings()
	{
		$result = $this->db->query("
			SELECT * FROM `meetings`
		");

		return $result->getResultArray();
	}

	public function getMeetingById(int $uniqueId)
	{
		$result = $this->db->query("
			SELECT
				m.*,
				GROUP_CONCAT(CONCAT(mp.user_id) SEPARATOR ',') AS receiver_ids
			FROM meetings m
			LEFT JOIN meeting_participants mp
				ON mp.meeting_id = m.unique_id
			WHERE
				m.unique_id = :unique_id:
			GROUP BY
				m.unique_id,
				m.provider_id,
				m.time_start,
				m.time_end,
				m.topic,
				m.when
			ORDER BY
				mp.user_id
			LIMIT 1
		", ['unique_id' => $uniqueId]);

		return $this->FirstOrNull($result->getResultArray());
	}

	public function getAllMeetingsForUser(int $userId)
	{
		$result = $this->db->query("
			SELECT 
				m.*,
				CASE 
					WHEN m.provider_id = :user_id: THEN
						GROUP_CONCAT(CONCAT(u.first_name, ' ', u.last_name) SEPARATOR ', ')
					ELSE
						CONCAT(p.first_name, ' ', p.last_name)
				END AS other_names
			FROM meetings m
			LEFT JOIN meeting_participants mp 
				ON mp.meeting_id = m.unique_id

			LEFT JOIN users u 
				ON u.id = mp.user_id

			LEFT JOIN users p 
				ON p.id = m.provider_id

			WHERE 
				m.provider_id = :user_id:
				OR mp.user_id = :user_id:

			GROUP BY 
				m.unique_id,
				m.provider_id,
				m.time_start,
				m.time_end,
				m.topic,
				m.when,
				p.first_name,
				p.last_name

			ORDER BY 
				m.time_start ASC,
				m.time_end ASC;
		", ['user_id' => $userId]);

		return $result->getResultArray();
	}

	public function getUpcomingMeetings(int $userId)
	{
		$result = $this->db->query("
			SELECT
				m.*,
				CASE 
					WHEN m.provider_id = :user_id: THEN
						GROUP_CONCAT(CONCAT(u.first_name, ' ', u.last_name) SEPARATOR ', ')
					ELSE
						CONCAT(p.first_name, ' ', p.last_name)
				END AS other_names
			FROM meetings m
			LEFT JOIN meeting_participants mp
				ON mp.meeting_id = m.unique_id
			
			LEFT JOIN users u
				ON mp.user_id = u.id

			LEFT JOIN users p
				ON p.id = m.provider_id

			WHERE
				(
					m.provider_id = :user_id:
					OR mp.user_id = :user_id:
				) AND
				m.when >= CURDATE()

			GROUP BY 
				m.unique_id,
				m.provider_id,
				m.time_start,
				m.time_end,
				m.topic,
				m.when,
				p.first_name,
				p.last_name

			ORDER BY 
				m.when       ASC,
				m.time_start ASC,
				m.time_end   ASC;
		", ['user_id' => $userId]);

		return $result->getResultArray();
	}

	public function createMeeting(int $providerId, string $topic, string $when, string $where, string $timeStart, string $timeEnd)
	{
		$params =
		[
			'provider_id' => $providerId,
			'topic'       => $topic,
			'when'        => $when,
			'where'       => $where,
			'time_start'  => $timeStart,
			'time_end'    => $timeEnd
		];

		$this->db->query("
			INSERT INTO `meetings`
			(`provider_id`, `topic`, `when`, `where`, `time_start`, `time_end`) VALUES
			(:provider_id:, :topic:, :when:, :where:, :time_start:, :time_end:)
		", $params);

		return $this->db->insertID();
	}

	public function addUsersToMeeting(int $meetingId, array $userIds)
	{
		foreach ($userIds as $userId)
		{
			$this->db->query("
			INSERT INTO meeting_participants
			(meeting_id, user_id)
			VALUES (:meeting_id:, :user_id:)
			", [
				'meeting_id' => $meetingId,
				'user_id'    => $userId
			]);
		}
	}

	public function editMeeting(int $meetingId, array|null $receiverIds, string|null $timeStart,
	string|null $timeEnd,string|null $topic, string|null $where, string|null $when)
	{
		if (isset($receiverIds))
		{
			$this->db->query("
				DELETE FROM `meeting_participants`
				WHERE `meeting_id` = ?
			", [$meetingId]);

			foreach ($receiverIds as $receiverId)
			{
				$this->db->query("
					INSERT INTO `meeting_participants`
					(`meeting_id`, `user_id`)
					VALUES (?, ?)
				", [$meetingId, $receiverId]);
			}
		}

		$this->db->query("
			UPDATE `meetings` SET
				`topic`      = COALESCE(?, `topic`),
				`when`       = COALESCE(?, `when`),
				`where`      = COALESCE(?, `where`),
				`time_start` = COALESCE(?, `time_start`),
				`time_end`   = COALESCE(?, `time_end`)
			WHERE unique_id = ?
		", [$topic, $when, $where, $timeStart, $timeEnd, $meetingId]);
	}
}