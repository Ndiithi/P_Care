import React from 'react';
import ReactDOM from 'react-dom';


import { v4 as uuidv4 } from 'uuid';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import ExpiryReport from './ExpiryReport';
import CurrentStock from './CurrentStock';

class StocksReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }


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
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h4 mb-0 text-gray-500">Expiry Report</h1>
                </div>

                <ul id="tabs" className="nav nav-tabs">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="home-tab"
                            data-toggle="tab" href="#currentStock" role="tab"
                            aria-controls="home"
                            aria-selected="true">
                            Current Stocks
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="1015-tab"
                            data-toggle="tab" href="#tab2" role="tab"
                            aria-controls="1015"
                            aria-selected="false">
                            Expiry btwn 10-15 days</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="1520-tab"
                            data-toggle="tab" href="#tab3" role="tab"
                            aria-controls="1520"
                            aria-selected="false">
                            Expiry btwn 15-20 days</a>
                    </li>

                </ul>
                <br />
                <div id="tabsContent" className="tab-content">

                    <div id="currentStock"
                        className="tab-pane fade active  show"  >
                        <h6 className="text-left">Current Stocks</h6>
                        <br />
                        <CurrentStock />
                    </div>
                    <div id="tab2"
                        className="tab-pane fade "  >
                        <h6 className="text-left">Products expiring between 10-15 days</h6>
                        <br />
                        <ExpiryReport time={"10_15"} />
                    </div>
                    <div id="tab3"
                        className="tab-pane fade" > {/* if add org permission not defined, edit is defined as this pop up shows in either or both defined*/}
                        <h6 className="text-left">Products expiring between 15-20 days</h6>
                        <br />
                        <ExpiryReport time={"15_20"} />
                    </div>
                </div>

            </React.Fragment >
        );
    }

}

export default StocksReport;

if (document.getElementById('stocks')) {
    ReactDOM.render(<StocksReport />, document.getElementById('stocks'));
}