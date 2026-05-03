export type UserGroup =
	| {
		type: "customer"
	}
	| {
		type: "provider"
	}
	| {
		type: "admin"
	}

export function ToUserGroup(userGroupNumber: string): UserGroup|undefined
{
	switch (userGroupNumber)
	{
		case "0":
			return {type: "customer"};
		case "1":
			return {type: "provider"};
		case "2":
			return {type: "admin"}
		default:
			return undefined;
	}
}