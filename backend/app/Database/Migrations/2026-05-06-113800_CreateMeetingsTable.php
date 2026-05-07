<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMeetingsTable extends Migration
{
	public function up()
	{
		$this->db->query("
			CREATE TABLE `meetings` (
				`unique_id`   int  NOT NULL,
				`provider_id` int  NOT NULL,
				`receiver_id` int  NOT NULL,
				`topic`       text NOT NULL,
				`when`        date NOT NULL,
				`where`       text NOT NULL,
				`time_start`  time NOT NULL,
				`time_end`    time NOT NULL
			)
		");

		$this->db->query("
			ALTER TABLE `meetings`
				ADD PRIMARY KEY (`unique_id`),
				ADD KEY `fk_meetings_provider_id` (`provider_id`),
				ADD KEY `fk_meetings_receiver_id` (`receiver_id`);
		");

		$this->db->query("
			ALTER TABLE `meetings`
  				MODIFY `unique_id` int NOT NULL AUTO_INCREMENT;
		");

		$this->db->query("
			ALTER TABLE `meetings`
				ADD CONSTRAINT `fk_meetings_provider_id`                      FOREIGN KEY (`provider_id`) REFERENCES `users` (`id`),
				ADD CONSTRAINT `fk_meetings_receiver_id`                      FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
				ADD CONSTRAINT `chk_meetings_fk_provider_receiver_difference` CHECK (`provider_id` <> `receiver_id`);
		");
	}

	public function down()
	{
	}
}
