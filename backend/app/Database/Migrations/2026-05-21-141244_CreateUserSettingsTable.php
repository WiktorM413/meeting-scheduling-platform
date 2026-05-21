<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserSettingsTable extends Migration
{
	public function up()
	{
		$this->db->query("
			CREATE TABLE `user_settings`
			(
				`unique_id`      int        NOT NULL,
				`user_id`        int        NOT NULL,
				`public_profile` tinyint(2) NOT NULL DEFAULT 1,
				`show_email`     tinyint(2) NOT NULL DEFAULT 1
			) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
		");

		$this->db->query("
			ALTER TABLE `user_settings`
				ADD PRIMARY KEY (`unique_id`),
				ADD UNIQUE KEY `uq_user_settings_user_id` (`user_id`);
		");

		$this->db->query("
			ALTER TABLE `user_settings`
  				MODIFY `unique_id` int NOT NULL AUTO_INCREMENT;
		");

		$this->db->query("
			ALTER TABLE `user_settings`
  				ADD CONSTRAINT `fk_user_settings_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
		");
	}

	public function down()
	{
	}
}
