import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { v4 as uuidv4 } from 'uuid';

import 'jspdf-autotable'

class LineChart extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            options: {
                title: {
                    text: ''
                },

                subtitle: {
                    text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>'
                },

                yAxis: {
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        formatter: function () {
                            return this.value + '°';
                        }
                    }
                },

                xAxis: {
                    categories: [],
                    // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    accessibility: {
                        description: 'Months of the year'
                    }
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },

                series: [{
                    data: []
                    // [43934, 48656, 65165, 81827, 112143, 142383,171533, 165174, 155157, 161454, 154610, 1212]
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            }

        }

    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps) {
        console.log("checking changes")
        console.log(this.props.chartData)
        if (
            this.props.chartData != prevProps.chartData
        ) {
            this.setState({
                options: {
                    xAxis: {
                        categories: this.props.chartDate,
                    },
                    series: [{
                        data: this.props.chartData
                    }],
                    title: {
                        text: 'Sales Prediction for '+ this.props.product +
                         ' for a period of '+ this.props.periodspan + ' months'
                    },
                }
            })
        }
    }


    render() {


        return (
            <React.Fragment>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </React.Fragment>
        );
    }

}

export default LineChart;

