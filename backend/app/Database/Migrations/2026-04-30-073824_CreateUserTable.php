<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserTable extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'id' => [
				'type'           => 'INT',
				'constraint'     => 11,
				'unsigned'       => true,
				'auto_increment' => true,
			],
			'first_name' => [
				'type'       => 'VARCHAR',
				'constraint' => 255,
				'null'       => false,
			],
			'last_name' => [
				'type'       => 'VARCHAR',
				'constraint' => 255,
				'null'       => false,
			],
			'email' => [
				'type'       => 'VARCHAR',
				'constraint' => 255,
				'null'       => false,
			],
			'password' => [
				'type' => 'TEXT',
				'null' => false,
			],
			'user_group' => [
				'type'       => 'SMALLINT',
				'constraint' => 2,
				'null'       => false,
			],
		]);

		$this->forge->addKey('id', true);

		$this->forge->createTable('users', true);
	}

	public function down()
	{
		$this->forge->dropTable('users', true);
	}
}