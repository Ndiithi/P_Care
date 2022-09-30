import React from 'react';
import ReactDOM from 'react-dom';


import { v4 as uuidv4 } from 'uuid';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Select from 'react-select'
import { predict, getCatalogs } from '../../utils/Helpers';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ArimaTable from './ArimaTable';

class Miner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            predict_data: [],
            productID: 'N02BA',
            selectedProductValue: [],
            periodspan: 15,
            model: 'arima',
            blocking: true,
        }
        this.getPrediction = this.getPrediction.bind(this);
        this.getCatalogs = this.getCatalogs.bind(this);
    }

    componentDidMount() {
        (async () => {
            this.getCatalogs();
            let predict_data = await predict(this.state.productID, this.state.periodspan, this.state.model);

            this.setState({
                predict_data: predict_data,
                blocking: false
            })
        })();
    }

    getCatalogs() {
        (async () => {
            let stock_data = await getCatalogs();
            let catalogs = stock_data.map((val) => {
                return { value: val.product_id, label: val.product_name }
            });
            this.setState({
                catalogs: catalogs,
            });
        })();
    }

    getPrediction(model, productID, periodspan) {
        // this.setState({
        //     blocking: true
        // })
        (async () => {
            let predict_data = await predict(productID, periodspan, model);

            this.setState({
                predict_data: predict_data,
                productID: productID,
                periodspan: periodspan,
                model: model,
                blocking: false
            });


        })();
        this.setState({
            blocking: true
        })
    }

    render() {
        console.log("the data from props is 0n3");
        console.log(this.state.predict_data);
        let tableData = [];

        try {
            if (this.state.model == 'arima') {

                tableData = this.state.predict_data


            } else {
                tableData = this.state.predict_data['projection']
            }

        } catch (err) {
            console.log(err);
        }
        let tabl = <ArimaTable
            product={this.state.productID}
            tableData={tableData}
            model={this.state.model} />

        return (
            <BlockUi tag="div" blocking={this.state.blocking} message="Running predictor model, please wait">

                <form>
                    <div className="form-row">
                        <div className="col-md-6 col-sm-6">
                            <Select
                                // value={this.state.selectedValue}
                                onChange={(product) => {

                                    this.getPrediction(this.state.model, product.value, this.state.periodspan);
                                }
                                }
                                placeholder="Search Product"
                                options={this.state.catalogs}
                            />

                        </div>

                        <div className="col-md-3 col-sm-3">
                            <Select
                                // value={this.state.selectedValue}
                                onChange={(model) => {
                                    this.getPrediction(model.value, this.state.productID, this.state.periodspan);
                                }
                                }
                                placeholder="Select Model"
                                options={
                                    [
                                        { value: 'arima', label: "Arima" },
                                        { value: 'prophet', label: "Prophet" }]
                                }
                            />

                        </div>

                        <div className="col-md-3 col-sm-3">
                            <input type="number" onChange={(event) => {
                                this.getPrediction(this.state.model, this.state.productID, event.target.value);
                            }}
                                min="1"
                                className="form-control"
                                placeholder='period length'
                            />

                        </div>

                    </div>
                </form>

                <br />
                {
                    tabl
                }

            </BlockUi>
        );
    }

}

export default Miner;

if (document.getElementById('mining')) {
    ReactDOM.render(<Miner />, document.getElementById('mining'));
}
