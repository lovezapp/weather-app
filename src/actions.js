import xhr from 'xhr';

export function changeLocation(location) {
    return {
        type: 'CHANGE_LOCATION',
        location: location,
    }
}

export function setData(data) {
    return {
        type: 'SET_DATA',
        data: data,
    }
}

export function setDates(dates) {
    return {
        type: 'SET_DATES',
        dates: dates,
    }
}

export function setTemps(temps) {
    return {
        type: 'SET_TEMPS',
        temperatures: temps,
    }
}
export function setSelectedDate(date) {
    return {
        type: 'SET_SELECTED_DATE',
        date: date,
    }
}

export function setSelectedTemp(temp) {
    return {
        type: 'SET_SELECTED_TEMP',
        temp: temp,
    }
}

export function fetchData(url) {
    return function thunk(dispatch) {
        xhr({
            url: url,
        }, (err, data) => {
            const body = JSON.parse(data.body);
            const list = body.list;
            const dates = [];
            const temps = [];
            list.forEach((el, i, arr) => {
                dates.push(arr[i].dt_txt);
                temps.push(arr[i].main.temp);
            });

            dispatch(setData(body));
            dispatch(setDates(dates));
            dispatch(setTemps(temps));
            dispatch(setSelectedDate(''));
            dispatch(setSelectedTemp(null));
        });
    }
}