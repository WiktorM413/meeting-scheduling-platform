<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserTable extends Migration
{
	public function up()
	{
		$this->db->query("
			CREATE TABLE `users` (
				`id`         int          NOT NULL,
				`first_name` varchar(255) NOT NULL,
				`last_name`  varchar(255) NOT NULL,
				`email`      varchar(255) NOT NULL,
				`password`   text         NOT NULL,
				`user_group` smallint(2)  NOT NULL
			) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
		");

		$this->db->query("
			ALTER TABLE `users`
				ADD PRIMARY KEY (`id`);
		");

		$this->db->query("
			ALTER TABLE `users`
				MODIFY `id` int NOT NULL AUTO_INCREMENT;
		");
	}

	public function down()
	{
	}
}
