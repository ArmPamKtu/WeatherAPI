import React, { Component } from 'react';
import CanvasJSReact from '../../chart_library/canvasjs.react';
import './chart.scss';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Chart extends Component <{ data: any}> {

    render() {
        return (
            <CanvasJSChart options = {this.props.data} 
			/>
        );
    }
}

export default Chart;