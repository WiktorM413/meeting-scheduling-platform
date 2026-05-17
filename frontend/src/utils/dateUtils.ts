export function FormatDate(date: string): string
{
	const todayObj     = new Date();
	const tomorrowObj  = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate() + 1);
	const yesterdayObj = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate() - 1);

	const today     = `${todayObj.getFullYear()}-${(todayObj.getMonth() + 1).toString().padStart(2, '0')}-${todayObj.getDate()}`;
	const tomorrow  = `${tomorrowObj.getFullYear()}-${(tomorrowObj.getMonth() + 1).toString().padStart(2, '0')}-${tomorrowObj.getDate()}`;
	const yesterday = `${yesterdayObj.getFullYear()}-${(yesterdayObj.getMonth() + 1).toString().padStart(2, '0')}-${yesterdayObj.getDate()}`;

	if (date === today)
	{
		return "Today";
	}
	else if (date === tomorrow)
	{
		return "Tomorrow";
	}
	else if (date === yesterday)
	{
		return "Yesterday";
	}

	return date;
}