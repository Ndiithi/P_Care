import React from 'react';
import ReactDOM from 'react-dom';
import LineGraph from '../../utils/charts/LineGraph';
import StackedHorizontal from '../../utils/charts/StackedHorizontal'

import { v4 as uuidv4 } from 'uuid';

import SiteLevelBarColumnCharts from './SiteLevelBarColumnCharts';
import OverallPerformanceRadar from './OverallPerformanceRadar';
import { CSVLink, CSVDownload } from "react-csv";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

class SpiReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
            siteType: [],
            echartsMinHeight: '',
           
            indicatorIndexToDisplay: 0
        }
        this.fetchOdkDataServer = this.fetchOdkDataServer.bind(this);
        this.onFilterButtonClickEvent = this.onFilterButtonClickEvent.bind(this);
        this.addTableRows = this.addTableRows.bind(this);
        this.exportAveragePerformancePDFData = this.exportAveragePerformancePDFData.bind(this);
        this.filterDisplayedIndicator = this.filterDisplayedIndicator.bind(this);

    }

    componentDidMount() {
        //fetch counties

    }

    componentDidMount() {
        (async () => {
            

        })();


    }

    render() {

        
        return (
            <React.Fragment>

                

            </React.Fragment>
        );
    }

}

export default SpiReport;

if (document.getElementById('SpiReport')) {
    // find element by id
    let domValues = [];
    let domValuesMap = {};
    const dataChart1 = document.getElementById('data-chart1');
    const dataChart2 = document.getElementById('data-chart2');
    const dataChart3 = document.getElementById('data-chart3');
    const dataChart4 = document.getElementById('data-chart4');
    const dataChart5 = document.getElementById('data-chart5');
    const dataChart6 = document.getElementById('data-chart6');
    const dataChart7 = document.getElementById('data-chart7');
    const dataChart8 = document.getElementById('data-chart8');
    // create new props object with element's data-attributes
    // result: {chart1: "data"}
    domValues.push(dataChart1.dataset);
    domValues.push(dataChart2.dataset);
    domValues.push(dataChart3.dataset);
    domValues.push(dataChart4.dataset);
    domValues.push(dataChart5.dataset);
    domValues.push(dataChart6.dataset);
    domValues.push(dataChart7.dataset);
    domValues.push(dataChart8.dataset);
    // domValues.push({'f':10})
    domValues.forEach(element => {
        for (const property in element) {
            domValuesMap[property] = element[property];
        }
    });

    const props = Object.assign({}, domValuesMap);
    ReactDOM.render(<SpiReport {...props} />, document.getElementById('SpiReport'));
}
