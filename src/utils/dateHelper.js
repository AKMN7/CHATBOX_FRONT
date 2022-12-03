// Function to convert timestamp to time (hour based)
export function timeStampToTime(stamp) {
	return new Date(stamp).toLocaleTimeString([], { timeStyle: "short" });
}

// Function to convert timestamp to date
export function timeStampToDate(stamp) {
	return new Date(stamp).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
}

// A function to check if the passed date is today or yesterday
export function checkIfTodayOrYesterday(date) {
	const yesterday = new Date(new Date());
	yesterday.setDate(yesterday.getDate() - 1);
	// Today
	if (timeStampToDate(new Date()) == date) return "Today";
	// Yesterday
	else if (timeStampToDate(yesterday) == date) return "Yesterday";
	// Neither today of yesterday
	else return date;
}
