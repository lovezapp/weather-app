import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
    changeLocation,
    setSelectedDate,
    setSelectedTemp,
    fetchData,
} from './actions';
import Plot from './Plot.js';
import moment from 'moment';

class App extends Component {
    state = {
        units: 'metric',
    };

    getMapData = (evt) => {
        evt.preventDefault();
        const apiPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
        const apiKey = 'f8de51579e911250fde04d347f32c5ea';
        const location = encodeURIComponent(this.props.location);
        const url = apiPrefix + location + '&APPID=' + apiKey + '&units=' + this.state.units;
        this.props.dispatch(fetchData(url));
    };

    changeThisLocation = (evt) => {
        this.props.dispatch(changeLocation(evt.target.value));
    };

    changeUnits = (evt) => {
        this.setState({
            units: evt.target.value
        });
        // this.props.dispatch(setUnit(evt.target.value);
    };

    onPlotClick = (data) => {
        if (data.points) {
            let number = data.points[0].pointNumber;
            this.props.dispatch(setSelectedDate(this.props.dates[number]));
            this.props.dispatch(setSelectedTemp(this.props.temperatures[number]));
        }
    };

    render() {
        const weatherList = this.props.data.list || undefined;
        const theDate = this.props.selected.date
            ? moment(this.props.selected.date).format('MMMM Do YYYY, h:mm a')
            : '';
        let curTemp =  Math.round(weatherList ? weatherList[0].main.temp : 0);
        let unitSymbol = this.state.units === 'metric' ? 'C' : 'F';
        return (
            <div>
                <h1>Weather</h1>
                <form onSubmit={this.getMapData}>
                <label>I want to know the weather for
                  <input
                      placeholder={"City, Country"}
                      value={this.props.location}
                      onChange={this.changeThisLocation}
                      type="text" />
                  </label>
                    <input type="radio" name="unit" value="metric" onClick={this.changeUnits} /> Metric
                    <input type="radio" name="unit" value="imperial" onClick={this.changeUnits} /> Imperial
                </form>
                {(weatherList) ? (
                    <div className="wrapper">
                        {/* Render the current temperature if no specific date is selected */}
                        {(this.props.selected.temp) ? (
                            <p>The temperature on { theDate } will be { this.props.selected.temp } &deg;{unitSymbol}</p>
                        ) : (
                            <p>The current temperature is { curTemp } &deg;{unitSymbol}</p>
                        )}
                        <h2>Forecast</h2>
                        <Plot
                            xData={this.props.dates}
                            yData={this.props.temperatures}
                            type="scatter"
                            onPlotClick={this.onPlotClick}
                        />
                    </div>
                ) : null}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        location: state.location,
        data: state.data,
        dates: state.dates,
        temperatures: state.temperatures,
        selected: state.selected,
    }
};

export default connect(mapStateToProps)(App);
