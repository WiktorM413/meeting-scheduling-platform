import type { RouteObject } from "react-router-dom";
import Index from "../Meetings/Index";

const MeetingsRoutes: RouteObject[] =
[
	{
		path:    "/meetings",
		element: <Index />
	}
]

export default MeetingsRoutes;