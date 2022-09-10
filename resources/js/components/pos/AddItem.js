import { forEach } from 'lodash';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Select from 'react-select'
import { getCatalogs, saveProduct } from '../utils/Helpers';

class AddItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            data: [],
            selectedValue: {},
            tableContent: []
        }
        this.getCatalogs = this.getCatalogs.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.addItemToTable = this.addItemToTable.bind(this);

    }

    componentDidMount() {
        this.getCatalogs();
    }

    getCatalogs() {
        (async () => {

            let data = await getCatalogs();

            let catalogs = data.map((val) => {
                return { value: val.product_id, label: val.name }
            });
            this.setState({
                catalogs: catalogs,
                data: data
            });
        })();
    }

    saveItem() {

        let returnedData = '';

        let prodId = "";
        try {
            prodId = this.state.selectedValue.value
        } catch (err) {

        }

        (async () => {
            returnedData = await saveProduct(
                prodId,
                this.state.batchNumber,
                this.state.expiryDate,
                this.state.noOfItems
            );

            if (returnedData) {
                this.setState({
                    responseMessage: returnedData.data.Message
                })
                $('#saveModal').modal('toggle');
                getCatalogs();
            }
        })();

    }

    addItemToTable() {
        console.log("www");
        if (Object.keys(this.state.selectedValue).length != 0) {
            let tableContent = this.state.tableContent;
            this.state.data.forEach(
                (catalog, index) => {

                    if (catalog.product_id == this.state.selectedValue.value) {

                        tableContent.push(catalog);
                        // return;
                    }
                }
            );
            this.setState({
                tableContent: tableContent
            });
        }
    }

    render() {
        let rows = [];
        this.state.tableContent.forEach((row, index) => {
            console.log(row.price)
            rows.push(<tr key={index}>
                <td>{index+1}</td>
                <td>{row.name}</td>
                <td>{row.manufacturer}</td>
                <td>{row.product_id}</td>
                <td>{row.price}</td>
            </tr>);
        })
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

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Product Id</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>

                    <tbody key={uuidv4()}>
                        {rows}
                    </tbody>

                </table>

            </React.Fragment>
        );
    }

}

export default AddItem;
