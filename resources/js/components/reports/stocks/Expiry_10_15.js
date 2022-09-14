import React from 'react';
import ReactDOM from 'react-dom';
import { FetchAuthorities, SaveRole, UpdateRole, FetchUserAuthorities, SaveCatalog, getExpiry10_15 } from '../../utils/Helpers';
import DualListBox from 'react-dual-listbox';
import Pagination from "react-js-pagination";


class Expiry_10_15 extends React.Component {


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

        this.getExpiry10_15 = this.getExpiry10_15.bind(this);

    }

    componentDidMount() {

        this.getExpiry10_15();

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

    getExpiry10_15() {
        (async () => {

            let data = await getExpiry10_15();
            this.setState({
                tableData: data,
                allTableElements: []
            });
        })();
    }

    render() {

        const imgStyle = {
            width: "100%"
        };

        const rowStle = {
            marginBottom: "5px"
        };


        let tableData = [];
        if (this.state.tableData.length > 0) {
            this.state.tableData.map((data, index) => {
                tableData.push(<tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.no_of_items}</td>
                    <td>{data.expiry_date}</td>
                </tr>
                );
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
                                    element['props']['children'][2]['props']['children'].includes(event.target.value) ||
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
                            <th scope="col">Name</th>
                            <th scope="col">No Of Items Sold</th>
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

export default Expiry_10_15;
