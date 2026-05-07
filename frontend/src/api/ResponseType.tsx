export type ResponseType =
	| {
		type:    "success";
		message: string;
		data:    any; 
	}
	| {
		type:    "error";
		message: string;
	};
