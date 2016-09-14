/* global Plotly */
// Plot.js

import React, { PropTypes, Component } from 'react';

class Plot extends Component {

    static propTypes = {
        xData: PropTypes.array,
        yData: PropTypes.array,
        type: PropTypes.string,
        onPlotClick: PropTypes.func,
    };

    componentDidMount() {
        this.drawPlot();
    }

    componentDidUpdate() {
        this.drawPlot();
    }

    drawPlot() {
        Plotly.newPlot('plot', [{
            x: this.props.xData,
            y: this.props.yData,
            type: this.props.type,
        }], {
            margin: {
                t: 0, r: 0, l: 30
            },
            xaxis: {
                gridcolor: 'transparent'
            },
        }, {
            displayModeBar: false
        });
        // pass function for event listener
        // do we really have to reach out to the DOM here?
        document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
    }

    render() {
        return(
            <div id="plot"></div>
        );
    }
}

export default Plot;