<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RemoveReceiverIdColumnFromMeetings extends Migration
{
	public function up()
	{
		$this->db->query("
			ALTER TABLE `meetings`
				DROP INDEX `fk_meetings_receiver_id`;
		");

		$this->db->query("
			ALTER TABLE meetings
				DROP CONSTRAINT chk_meetings_fk_provider_receiver_difference;
		");

		$this->db->query("
			ALTER TABLE `meetings`
				DROP `receiver_id`
		");
	}

	public function down()
	{
	}
}
