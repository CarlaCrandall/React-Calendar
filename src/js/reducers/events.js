const initialState = {
	items: null,
	loading: false,
	error: false
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'EVENTS_REQUEST':
		return {
			loading: true,
			error: false
		};

	case 'EVENTS_RECEIVE':
		return {
			items: action.payload.items,
			loading: false
		};

	case 'EVENTS_FAILURE':
		return {
			loading: false,
			error: true
		};

    default:
    	return state;
  }
}

export default events;
