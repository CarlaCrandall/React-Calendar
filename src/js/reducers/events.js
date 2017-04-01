const initialState = {
	items: [],
	loading: false,
	error: false
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'EVENTS_REQUEST':
		return {
			...state,
			loading: true,
			error: false
		};

	case 'EVENTS_RECEIVE':
		return {
			...state,
			items: action.payload.items,
			loading: false
		};

	case 'EVENTS_FAILURE':
		return {
			...state,
			loading: false,
			error: true
		};

    default:
    	return state;
  }
}

export default events;
