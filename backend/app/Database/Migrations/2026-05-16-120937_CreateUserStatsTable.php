<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserStatsTable extends Migration
{
	public function up()
	{
		$this->db->query("
			CREATE TABLE `user_stats` (
				`unique_id` int(11) NOT NULL,
				`user_id` int(11) DEFAULT NULL,
				`meetings_hosted` int(11) DEFAULT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
		");

		$this->db->query("
			ALTER TABLE `user_stats`
				ADD PRIMARY KEY (`unique_id`),
				ADD UNIQUE KEY `unique_user` (`user_id`);
		");

		$this->db->query("
			ALTER TABLE `user_stats`
  				MODIFY `unique_id` int(11) NOT NULL AUTO_INCREMENT;
		");

		$this->db->query("
			ALTER TABLE `user_stats`
  				ADD CONSTRAINT `fk_user_stats_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
		");

		$this->db->query("
			CREATE TRIGGER after_meeting_insert
				AFTER INSERT ON meetings
				FOR EACH ROW
					INSERT INTO user_stats (user_id, meetings_hosted)
					VALUES (NEW.created_by, 1)
					ON DUPLICATE KEY UPDATE meetings_hosted = meetings_hosted + 1;
		");

		$this->db->query("
			CREATE TRIGGER after_meeting_delete
			AFTER DELETE ON meetings
			FOR EACH ROW
				UPDATE user_stats
				SET meetings_hosted = GREATEST(meetings_hosted - 1, 0)
				WHERE user_id = OLD.created_by;
		");
	}

	public function down()
	{
	}
}
