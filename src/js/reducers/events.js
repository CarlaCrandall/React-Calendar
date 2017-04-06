import moment from 'moment';

const initialState = {
    eventsByDate: {},
    loading: false,
    error: false
};

const events = (state = initialState, action) => {
    switch (action.type) {
        case 'EVENTS_REQUEST': {
            return {
                ...state,
                eventsByDate: {},
                loading: true,
                error: false
            };
        }

        case 'EVENTS_RECEIVE': {
            const
                monthEvents = action.payload.items,
                dateObjects = {};

            // Separate all events by date
            monthEvents.forEach((event) => {
                const
                    start = moment(event.start.date || event.start.dateTime),
                    end = moment(event.end.date || event.end.dateTime);

                // End date for all day and mutli-day events is the next day
                // If all day or multi-day event, update the end date
                if (event.end.date) {
                    end.subtract(1, 'days');
                }

                const
                    startNum = start.date(),
                    endNum = end.date();

                // Push event into each relevant date array
                for (let i = startNum; i <= endNum; ++i) {
                    const key = `day_${i}`;
                    dateObjects[key] = dateObjects[key] || [];
                    dateObjects[key].push(event);
                }
            });

            return {
                ...state,
                eventsByDate: dateObjects,
                loading: false
            };
        }

        case 'EVENTS_FAILURE': {
            return {
                ...state,
                loading: false,
                error: true
            };
        }

        default: {
            return state;
        }
    }
};

export default events;
