import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";

import { v4 as uuidv4 } from 'uuid';

import 'jspdf-autotable'

class ArimaTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            currTableEl: [],
            allTableElements: [],
            allowedPermissions: [],
            startTableData: 0,
            endeTableData: 10,
            activePage: 1,
        }

    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps) {
        if (
            this.props.tableData != prevProps.tableData
            ||
            this.props.product != prevProps.product
            ||
            this.props.model != prevProps.model
        ) {
            this.setState({
                tableData: this.props.tableData,
                allTableElements: []
            })
        }
    }

    handlePageChange(pageNumber) {
        //console.log(`active page is ${pageNumber}`);
        let pgNumber = pageNumber * 10 + 1;
        this.setState({
            startTableData: pgNumber - 11,
            endeTableData: pgNumber - 1,
            activePage: pageNumber
        });
    }

    render() {

        const imgStyle = {
            width: "100%"
        };

        const rowStle = {
            marginBottom: "5px"
        };

        let tableData = [];

        if (this.props.tableData != undefined && this.props.tableData.length > 0) {
            let projection_data = [];
            console.log("the data from props is");
            console.log(this.props.tableData);
            if (this.props.model == 'prophet') {
                projection_data = this.props.tableData;
            } else {
                projection_data = this.props.tableData;
            }

            projection_data.map((data, index) => {
                if (index != 0) {
                    let formattedDate = data.time
                    if (this.props.model == 'arima') {
                        let date = new Date(data.time);
                        let year = date.toLocaleString("default", { year: "numeric" });
                        let month = date.toLocaleString("default", { month: "2-digit" });
                        let day = date.toLocaleString("default", { day: "2-digit" });
                        formattedDate = day + "-" + month + "-" + year;
                    } else {
                        let endMontDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                        let month = data.time.substring(4, 6)
                        formattedDate = endMontDays[Number(month) - 1] + "-" + month + "-" + data.time.substring(0, 4)
                    }

                    tableData.push(<tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{this.props.product}</td>
                        <td>{(Math.round(data.value * 100) / 100).toFixed(2)}</td>
                        <td>{
                            formattedDate
                        }</td>
                    </tr>
                    );
                }
            });
            if (this.state.allTableElements.length == 0) {
                this.setState({
                    allTableElements: tableData,
                    currTableEl: tableData
                })
            }

        }

        let pageContent = <div id='_table' className='row'>
            <div className='col-sm-12 col-md-12'>
                <div className="form-group mb-2">
                    <input type="text"
                        onChange={(event) => {
                            console.log(this.state.allTableElements)
                            let currTableEl = this.state.allTableElements.filter(
                                element =>
                                    element['props']['children'][1]['props']['children'].toLowerCase().trim().includes(event.target.value.trim().toLowerCase()) ||
                                    element['props']['children'][2]['props']['children'] == event.target.value.trim() ||
                                    element['props']['children'][3]['props']['children'].toLowerCase().trim().includes(event.target.value.trim().toLowerCase())
                            );

                            this.setState({
                                currTableEl: currTableEl,
                                activePage: 1,
                                startTableData: 0,
                                endeTableData: 10,
                            })

                        }}
                        className="form-control" placeholder="search"></input>
                </div>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product</th>
                            <th scope="col">No Of Items Purchased</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currTableEl.slice(this.state.startTableData, this.state.endeTableData)}
                    </tbody>

                </table>
                <br />
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.currTableEl.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        </div>;


        return (
            <React.Fragment>
                {pageContent}
            </React.Fragment>
        );
    }

}

export default ArimaTable;

