export const nextMonth = (currentMonth, currentYear) => {
	let month, year;

	if (currentMonth === 11) {
		month = 0;
		year = currentYear + 1;
	} else {
		month = currentMonth + 1;
		year = currentYear;
	}

	return {
		type: 'NEXT_MONTH',
		month: month,
		year: year,
		date: 1
	};
};

export const prevMonth = (currentMonth, currentYear) => {
	let month, year;

	if (currentMonth === 0) {
		month = 11;
		year = currentYear - 1;
	} else {
		month = currentMonth - 1;
		year = currentYear;
	}

	return {
		type: 'PREV_MONTH',
		month: month,
		year: year,
		date: 1
	};
};


export const selectDate = (date) => {
	return {
		type: 'SELECT_DATE',
		date: date
	};
}
