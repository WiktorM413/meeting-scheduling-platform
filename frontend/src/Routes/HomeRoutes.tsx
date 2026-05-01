import Index from "../Home/Index";
import Login from "../Home/Login";
import Register from "../Home/Register";
import type { RouteObject } from "react-router-dom";

const HomeRoutes: RouteObject[] =
[
	{
		path:    "/home",
		element: <Index />,
	},
	{
		path:    "/register",
		element: <Register />,
	},
	{
		path:    "/login",
		element:  <Login />
	}
];

export default HomeRoutes;