import type { RouteObject } from "react-router-dom";
import UserProfile from "../User/UserProfile";
import EditUser from "../User/EditUser";

const UserRoutes: RouteObject[] =
[
	{
		path:    "/userProfile/:userId",
		element: <UserProfile />
	},
	{
		path:    "/editUser/:userId",
		element: <EditUser />
	}
]

export default UserRoutes;