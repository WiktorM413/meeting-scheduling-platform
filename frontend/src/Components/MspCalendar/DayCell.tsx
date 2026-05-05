type Availability =
| {
	state: "available"
}
| {
	state: "partial"
}
| {
	state: "blocked"
}
| {
	state: "booked"
}

export type DayCell =
{
	date:         number;
	isToday:      boolean;
	isSelected:   boolean;
	availability: boolean; //should later be Availability based on data from db
}
| null

