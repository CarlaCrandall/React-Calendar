export const nextMonth = (currentMonth, currentYear, selectedDate = 1) => {
    let month,
        year;

    if (currentMonth === 11) {
        month = 0;
        year = currentYear + 1;
    } else {
        month = currentMonth + 1;
        year = currentYear;
    }

    return {
        type: 'NEXT_MONTH',
        date: selectedDate,
        month,
        year
    };
};

export const prevMonth = (currentMonth, currentYear, selectedDate = 1) => {
    let month,
        year;

    if (currentMonth === 0) {
        month = 11;
        year = currentYear - 1;
    } else {
        month = currentMonth - 1;
        year = currentYear;
    }

    return {
        type: 'PREV_MONTH',
        date: selectedDate,
        month,
        year
    };
};


export const selectDate = date => ({
    type: 'SELECT_DATE',
    date
});
