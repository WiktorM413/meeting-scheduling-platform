<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMeetingParticipantsTable extends Migration
{
	public function up()
	{
		$this->db->query("
			CREATE TABLE `meeting_participants`
			(
				`id` int(11) NOT NULL,
				`meeting_id` int(11) NOT NULL,
				`user_id` int(11) NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
		");

		$this->db->query("
			ALTER TABLE `meeting_participants`
				ADD PRIMARY KEY (`id`),
				ADD UNIQUE KEY `unique_participant` (`meeting_id`,`user_id`),
				ADD KEY `fk_meeting_participants_user` (`user_id`);
		");

		$this->db->query("
			ALTER TABLE `meeting_participants`
  				MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
		");

		$this->db->query("
			ALTER TABLE `meeting_participants`
				ADD CONSTRAINT `fk_meeting_participants_meeting` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`unique_id`),
				ADD CONSTRAINT `fk_meeting_participants_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
		");
	}

	public function down()
	{
	}
}
