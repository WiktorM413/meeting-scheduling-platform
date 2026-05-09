<?php

namespace App\Services;

use App\Models\MeetingsModel;

class MeetingsService
{
	protected MeetingsModel $meetingsModel;
	
	public function __construct()
	{
		$this->meetingsModel = model(MeetingsModel::class);
		helper('response');
	}
	
	public function getAllMeetings()
	{
		$meetings = $this->meetingsModel->getAllMeetings();

		return DataJson(false, "Successfully retrieved meetings", $meetings);
	}

	public function getAllMeetingsForUser(int $userId)
	{
		$meetings = $this->meetingsModel->getAllMeetingsForUser($userId);

		return DataJson(false, "Successfully retrieved meetings", $meetings);
	}

	public function createMeeting(int $providerId, array $receiverIds, string $topic, string $when, string $where, string $timeStart, string $timeEnd)
	{
		foreach ($receiverIds as $receiverId)
		{
			$this->meetingsModel->createMeeting($providerId, $receiverId, $topic, $when, $where, $timeStart, $timeEnd);
		}

		return SimpleJson(false, "Successfully scheduled a meeting");
	}
}