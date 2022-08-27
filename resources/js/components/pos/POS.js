import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import NewItem from './AddItem';

import { v4 as uuidv4 } from 'uuid';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

class POS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            currProductTableEl: [],
            allTableElements: [],
            selectedProduct: null,
            allowedPermissions: [],
            productActionState: 'productList',
            startTableData: 0,
            endeTableData: 10,
            activePage: 1,
        }


    }

    componentDidMount() {
        //fetch counties

    }

    componentDidMount() {
        (async () => {


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

        let products = [];
        if (this.state.products.length > 0) {
            this.state.products.map((product, index) => {
                products.push(<tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{product.first_name} {product.last_name}</td>
                    <td>{product.email}</td>
                    <td>{product.role_name}</td>
                    {
                        this.state.allowedPermissions.includes('edit_product') ||
                            this.state.allowedPermissions.includes('delete_product') ?
                            <td>
                                {
                                    this.state.allowedPermissions.includes('edit_product') ?
                                        <a
                                            onClick={
                                                () => {
                                                    this.toggleDisplay();
                                                    this.setState({
                                                        productActionState: 'edit',
                                                        selectedProduct: product
                                                    });
                                                }
                                            }
                                            style={{ 'marginRight': '5px' }}
                                            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                            <i className="fas fa-user-edit"></i>
                                        </a> : ''
                                }
                                {
                                    this.state.allowedPermissions.includes('delete_product') ?
                                        <a
                                            onClick={() => {
                                                this.setState({
                                                    selectedProduct: product
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
                    allTableElements: products,
                    currProductTableEl: products
                })
            }


        }


        let pageContent = <div id='product_table' className='row'>
            <div className='col-sm-12 col-md-12'>
                <div className="form-group mb-2">
                    <input type="text"
                        onChange={(event) => {
                            let currProductTableEl = this.state.allTableElements.filter(

                            );

                            this.setState({
                                currProductTableEl: currProductTableEl,
                                activePage: 1,
                                startTableData: 0,
                                endeTableData: 10,
                            })

                        }}
                        className="form-control" placeholder="search product"></input>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            {
                                this.state.allowedPermissions.includes('edit_product') ||
                                    this.state.allowedPermissions.includes('delete_product') ?
                                    <th scope="col">Action</th> : ''
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currProductTableEl.slice(this.state.startTableData, this.state.endeTableData)}
                    </tbody>

                </table>
                <br />
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.currProductTableEl.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
            </div>
        </div>;

        return (
            <React.Fragment>
                <NewItem />
            </React.Fragment>
        );
    }

}


export default POS;

if (document.getElementById('POS')) {
    // find element by id
    let domValues = [];
    let domValuesMap = {};

    // domValues.push({'f':10})
    domValues.forEach(element => {
        for (const property in element) {
            domValuesMap[property] = element[property];
        }
    });

    const props = Object.assign({}, domValuesMap);
    ReactDOM.render(<POS {...props} />, document.getElementById('POS'));
}
