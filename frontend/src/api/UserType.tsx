import type { UserGroup } from "./UserGroup";

export interface UserData
{
	id:          number;
	first_name:  string;
	last_name:   string;
	email:       string;
	user_group:  UserGroup|undefined;
	profile_pic: string|undefined;
}