export type DayCell =
{
	date:         number;
	isToday:      boolean;
	isSelected:   boolean;
	hasEvents:    boolean;
	availability: boolean;
}
| null

