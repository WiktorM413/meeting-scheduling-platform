import HomeRoutes from "./HomeRoutes";
import MeetingsRoutes from "./MeetingsRoutes";
import UserRoutes from "./UserRoutes";
import type { RouteObject } from "react-router-dom";

const routes: RouteObject[] =
[
	...HomeRoutes,
	...MeetingsRoutes,
	...UserRoutes
];

export default routes;