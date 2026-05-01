export type ResponseType =
	| {
		type:    "success";
		message: string;
	}
	| {
		type:    "error";
		message: string;
	};
