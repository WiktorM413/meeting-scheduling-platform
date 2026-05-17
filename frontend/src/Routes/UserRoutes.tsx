import type { RouteObject } from "react-router-dom";
import UserProfile from "../User/UserProfile";
import UserSettings from "../User/UserSettings";

const UserRoutes: RouteObject[] =
[
	{
		path:    "/userProfile/:userId",
		element: <UserProfile />
	},
	{
		path:    "/editUser/:userId",
		element: <UserSettings />
	}
]

export default UserRoutes;