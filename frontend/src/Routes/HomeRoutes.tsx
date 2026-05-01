import Index from "../Home/Index";
import Register from "../Home/Register";
import type { RouteObject } from "react-router-dom";

const HomeRoutes: RouteObject[] =
[
	{
		path: "/home",
		element: <Index />,
	},
	{
		path: "/register",
		element: <Register />,
	},
];

export default HomeRoutes;