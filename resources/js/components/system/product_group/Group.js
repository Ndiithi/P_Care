import React from 'react';
import ReactDOM from 'react-dom';
import { getProductGroup } from '../../utils/Helpers';
import Pagination from "react-js-pagination";
import NewItem from './NewItem';

class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currDataTableEl: [],
            allTableElements: [],
            selectedData: null,
            allowedPermissions: [],
            dataActionState: 'dataList',
            startTableData: 0,
            endeTableData: 10,
            activePage: 1,
        }
        this.getGroups = this.getGroups.bind(this);

    }

    componentDidMount() {

        this.getGroups();

    }

    getGroups() {
        (async () => {

            let getGroups = await getProductGroup();
            this.setState({
                data: getGroups,
                allTableElements: []
            });
        })();
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
        if (this.state.data.length > 0) {
            this.state.data.map((data, index) => {
                tableData.push(<tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.name} </td>
                    <td>{data.updated_at}</td>
                    {
                        this.state.allowedPermissions.includes('edit_product_group') ||
                            this.state.allowedPermissions.includes('delete_product_group') ?
                            <td>
                                {
                                    this.state.allowedPermissions.includes('edit_product_group') ?
                                        <a
                                            onClick={
                                                () => {
                                                    this.toggleDisplay();
                                                    this.setState({
                                                        dataActionState: 'edit',
                                                        selectedData: data
                                                    });
                                                }
                                            }
                                            style={{ 'marginRight': '5px' }}
                                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                            <i className="fas fa-user-edit"></i>
                                        </a> : ''
                                }
                                {
                                    this.state.allowedPermissions.includes('delete_product_group') ?
                                        <a
                                            onClick={() => {
                                                this.setState({
                                                    selectedData: data
                                                });
                                                $('#deleteConfirmModal').modal('toggle');
                                            }} className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm">
                                            <i className="fas fa-user-times"></i>
                                        </a> : ''
                                }
                            </td> : ''
                    }
                </tr>
                );
            });
            if (this.state.allTableElements.length == 0) {
                this.setState({
                    allTableElements: tableData,
                    currDataTableEl: tableData
                })
            }

        }


        let pageContent = <div id='data_table' className='row'>
            <div className='col-sm-12 col-md-12'>
                <div className="form-group mb-2">
                    <input type="text"
                        onChange={(event) => {
                            console.log(this.state.allTableElements)
                            let currDataTableEl = this.state.allTableElements.filter(
                                element =>
                                    element['props']['children'][1]['props']['children'][0].toLowerCase().trim().includes(event.target.value.trim().toLowerCase()) ||
                                    element['props']['children'][2]['props']['children'].toLowerCase().trim().includes(event.target.value.trim().toLowerCase())
                            );


                            this.setState({
                                currDataTableEl: currDataTableEl,
                                activePage: 1,
                                startTableData: 0,
                                endeTableData: 10,
                            })

                        }}
                        className="form-control" placeholder="search group"></input>
                </div>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Update At</th>
                            {
                                this.state.allowedPermissions.includes('edit_product_group') ||
                                    this.state.allowedPermissions.includes('delete_product_group') ?
                                    <th scope="col">Action</th> : ''
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currDataTableEl.slice(this.state.startTableData, this.state.endeTableData)}
                    </tbody>

                </table>
                <br />
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.currDataTableEl.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        </div>;

        return (
            <React.Fragment>
                <h1 className="h4 mb-0 text-gray-500">Product Groups</h1>
                <br />
                <NewItem getGroups={this.getGroups} />
                <hr />
                <br />
                {pageContent}
            </React.Fragment>
        );
    }

}

export default Group;

if (document.getElementById('product_group')) {
    ReactDOM.render(<Group />, document.getElementById('product_group'));
}