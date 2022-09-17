import React from 'react';
import ReactDOM from 'react-dom';
import { getCatalogs } from '../../utils/Helpers';
import Pagination from "react-js-pagination";
import NewItem from './NewItem';

class Group extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            currCatalogTableEl: [],
            allTableElements: [],
            selectedCatalog: null,
            allowedPermissions: [],
            catalogActionState: 'catalogList',
            startTableData: 0,
            endeTableData: 10,
            activePage: 1,
        }
        this.getCatalogs = this.getCatalogs.bind(this);

    }

    componentDidMount() {

        this.getCatalogs();

    }

    getCatalogs() {
        (async () => {

            let catalogs = await getCatalogs();
            this.setState({
                catalogs: catalogs,
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


        let catalogs = [];
        if (this.state.catalogs.length > 0) {
            this.state.catalogs.map((catalog, index) => {
                catalogs.push(<tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{catalog.name} {catalog.last_name}</td>
                    <td>{catalog.manufacturer}</td>
                    <td>{catalog.product_id}</td>
                    <td>{catalog.price}</td>
                    <td>{catalog.updated_at}</td>
                    {
                        this.state.allowedPermissions.includes('edit_catalog') ||
                            this.state.allowedPermissions.includes('delete_catalog') ?
                            <td>
                                {
                                    this.state.allowedPermissions.includes('edit_catalog') ?
                                        <a
                                            onClick={
                                                () => {
                                                    this.toggleDisplay();
                                                    this.setState({
                                                        catalogActionState: 'edit',
                                                        selectedCatalog: catalog
                                                    });
                                                }
                                            }
                                            style={{ 'marginRight': '5px' }}
                                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                            <i className="fas fa-user-edit"></i>
                                        </a> : ''
                                }
                                {
                                    this.state.allowedPermissions.includes('delete_catalog') ?
                                        <a
                                            onClick={() => {
                                                this.setState({
                                                    selectedCatalog: catalog
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
                    allTableElements: catalogs,
                    currCatalogTableEl: catalogs
                })
            }

        }


        let pageContent = <div id='catalog_table' className='row'>
            <div className='col-sm-12 col-md-12'>
                <div className="form-group mb-2">
                    <input type="text"
                        onChange={(event) => {
                            console.log(this.state.allTableElements)
                            let currCatalogTableEl = this.state.allTableElements.filter(
                                element =>
                                    element['props']['children'][1]['props']['children'][0].toLowerCase().trim().includes(event.target.value.trim().toLowerCase()) ||
                                    element['props']['children'][2]['props']['children'].toLowerCase().trim().includes(event.target.value.trim().toLowerCase())
                            );


                            this.setState({
                                currCatalogTableEl: currCatalogTableEl,
                                activePage: 1,
                                startTableData: 0,
                                endeTableData: 10,
                            })

                        }}
                        className="form-control" placeholder="search catalog"></input>
                </div>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Manufacturer</th>
                            <th scope="col">Product Id</th>
                            <th scope="col">Price</th>
                            <th scope="col">Update At</th>
                            {
                                this.state.allowedPermissions.includes('edit_catalog') ||
                                    this.state.allowedPermissions.includes('delete_catalog') ?
                                    <th scope="col">Action</th> : ''
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currCatalogTableEl.slice(this.state.startTableData, this.state.endeTableData)}
                    </tbody>

                </table>
                <br />
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.currCatalogTableEl.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        </div>;

        return (
            <React.Fragment>
                <h1 className="h4 mb-0 text-gray-500">Catalog</h1>
                <br />
                <NewItem getCatalogs={this.getCatalogs} />
                <hr />
                <br />
                {pageContent}
            </React.Fragment>
        );
    }

}

export default Group;

if (document.getElementById('product_group')) {
    ReactDOM.render(<Group />, document.getElementById('Group'));
}