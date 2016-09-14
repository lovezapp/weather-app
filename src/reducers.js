const initialState = {
    location: '',
    units: 'metric',
    data: {},
    dates: [],
    temperatures: [],
    selected: {
        date: '',
        temp: null,
    }
};

export default function mainReducer(state, action) {
    state = state === undefined ? initialState : state;
    switch (action.type) {
        case 'CHANGE_LOCATION':
            return Object.assign({}, state, {
                location: action.location,
            });
        case 'SET_DATA':
            return Object.assign({}, state, {
                data: action.data,
            });
        case 'SET_DATES':
            return Object.assign({}, state, {
                dates: action.dates,
            });
        case 'SET_TEMPS':
            return Object.assign({}, state, {
                temperatures: action.temperatures,
            });
        case 'SET_SELECTED_DATE':
            return Object.assign({}, state, {
                selected: {
                    date: action.date,
                    temp: state.selected.temp,
                }
            });
        case 'SET_SELECTED_TEMP':
            return Object.assign({}, state, {
                selected: {
                    date: state.selected.date,
                    temp: action.temp,
                }
            });
        default:
            return state;
    }
}