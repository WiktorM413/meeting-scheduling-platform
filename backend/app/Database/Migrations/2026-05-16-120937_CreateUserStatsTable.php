<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserStatsTable extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'unique_id' => [
				'type'           => 'INT',
				'constraint'     => 11,
				'unsigned'       => true,
				'auto_increment' => true,
			],
			'user_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
				'null'       => true,
			],
			'meetings_hosted' => [
				'type'       => 'INT',
				'constraint' => 11,
				'null'       => true,
				'default'    => null,
			],
		]);

		$this->forge->addKey('unique_id', true);
		$this->forge->addKey('user_id', true);

		$this->forge->createTable('user_stats', true);

		$this->db->query("
			ALTER TABLE user_stats
			ADD CONSTRAINT fk_user_stats_user
			FOREIGN KEY (user_id) REFERENCES users(id)
			ON DELETE CASCADE
		");

		$this->db->query("
			CREATE TRIGGER after_meeting_insert
			AFTER INSERT ON meetings
			FOR EACH ROW
			INSERT INTO user_stats (user_id, meetings_hosted)
			VALUES (NEW.created_by, 1)
			ON DUPLICATE KEY UPDATE meetings_hosted = meetings_hosted + 1
		");

		$this->db->query("
			CREATE TRIGGER after_meeting_delete
			AFTER DELETE ON meetings
			FOR EACH ROW
			UPDATE user_stats
			SET meetings_hosted = GREATEST(meetings_hosted - 1, 0)
			WHERE user_id = OLD.created_by
		");
	}

	public function down()
	{
		$this->db->query("DROP TRIGGER IF EXISTS after_meeting_insert");
		$this->db->query("DROP TRIGGER IF EXISTS after_meeting_delete");
		$this->forge->dropTable('user_stats', true);
	}
}