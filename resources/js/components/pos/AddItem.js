import { forEach } from 'lodash';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Select from 'react-select'
import { getStocks, saveProduct, saveSales } from '../utils/Helpers';

class AddItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            data: [],
            selectedValue: {},
            tableContent: [],
            totalPrice: 0,
            responseMessage: ""
        }
        this.getStocks = this.getStocks.bind(this);
        this.addItemToTable = this.addItemToTable.bind(this);
        this.checkOut = this.checkOut.bind(this);

    }

    componentDidMount() {
        this.getStocks();
    }

    getStocks() {
        (async () => {

            let data = await getStocks();

            let catalogs = data.map((val) => {
                return { value: val.product_id + "-" + val.batch_no, label: val.name + "-" + val.batch_no }
            });
            this.setState({
                catalogs: catalogs,
                data: data
            });
        })();
    }

    addItemToTable() {
        if (Object.keys(this.state.selectedValue).length != 0) {
            let tableContent = this.state.tableContent;
            let totalPrice = this.state.totalPrice;
            let data = this.state.data;
            let showModal = false;
            let responseMessage = "";
            this.state.data.forEach(
                (catalog, index) => {

                    if (catalog.product_id + "-" + catalog.batch_no == this.state.selectedValue.value
                    ) {

                        totalPrice += catalog.price;
                        tableContent.push(catalog);
                        //remove from list as all available items sold out
                        if (catalog.no_of_items <= 1) {
                            data.splice(index, 1);
                            showModal = true;
                            responseMessage = "Item Out Of Stock";
                        } else {
                            catalog.no_of_items = catalog.no_of_items - 1;
                            data[index] = catalog;
                        }
                        // return;
                    }
                }
            );

            let catalogs = data.map((val) => {
                return { value: val.product_id + "-" + val.batch_no, label: val.name + "-" + val.batch_no }
            });



            this.setState({
                tableContent: tableContent,
                totalPrice: totalPrice,
                data: data,
                catalogs: catalogs,
                responseMessage: responseMessage
            });
            if (showModal) {
                $('#saveModal').modal('toggle');
            }

        }
    }

    checkOut() {
        let returnedData = '';
        (async () => {
            returnedData = await saveSales(
                this.state.tableContent
            );

            if (returnedData) {
                this.setState({
                    responseMessage: returnedData.data.Message,
                    tableContent: [],
                    selectedValue: {},
                    totalPrice: 0,
                })
                $('#saveModal').modal('toggle');
            }
        })();
    }

    render() {
        let rows = [];
        this.state.tableContent.forEach((row, index) => {
            rows.push(<tr key={index}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.batch_no}</td>
                <td>{row.manufacturer}</td>
                <td>{row.product_id}</td>
                <td>{row.price}</td>
            </tr>);
        })
        rows.push(<tr key={uuidv4()}>
            <td>{"--"}</td>
            <td>{"--"}</td>
            <td>{"--"}</td>
            <td>{"--"}</td>
            <td>{"TOTAL"}</td>
            <td>{this.state.totalPrice}</td>
        </tr>);
        return (
            <React.Fragment>

                <form>
                    <div className="form-row">
                        <div className="col-md-10 col-sm-10">
                            <Select
                                // value={this.state.selectedValue}
                                onChange={(product) => {
                                    this.setState({
                                        productID: product.value,
                                        selectedValue: product
                                    });
                                }
                                }
                                placeholder="Search Product"
                                options={this.state.catalogs}
                            />

                        </div>
                        <div className="col-md-2 col-sm-2">

                            <button type="button"

                                onClick={() => {
                                    this.addItemToTable();
                                }}
                                className="btn btn-block btn-info">
                                <i className="fas fa-plus-circle"></i> Add
                            </button>
                        </div>

                    </div>

                </form>

                <br />

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Batch No</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Product Id</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>

                    <tbody key={uuidv4()}>
                        {rows}
                    </tbody>

                </table>
                <button onClick={() => this.checkOut()} className="btn btn-block btn-info">Checkout</button>


                < div className="modal fade" id="saveModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="saveModalTitle">Notice!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.responseMessage ? this.state.responseMessage : ''
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div >
            </React.Fragment>
        );
    }

}

export default AddItem;
