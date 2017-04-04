export const nextMonth = (currentMonth, currentYear, focusedDate = 1) => {
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
        date: null,
        month,
        year,
        focusedDate
    };
};

export const prevMonth = (currentMonth, currentYear, focusedDate = 1) => {
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
        date: null,
        month,
        year,
        focusedDate
    };
};


export const selectDate = date => ({
    type: 'SELECT_DATE',
    date
});

export const focusDate = date => ({
    type: 'FOCUS_DATE',
    date
});
