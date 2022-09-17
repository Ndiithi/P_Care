import React from 'react';
import ReactDOM from 'react-dom';
import { getProductGroup, SaveCatalog } from '../../utils/Helpers';
import DualListBox from 'react-dual-listbox';
import Select from 'react-select'

class NewItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            responseMessage: "",
            productName: "",
            manufacturer: "",
            price: "",
            productID: "",
            productGroupID: ""
        };
        this.saveItem = this.saveItem.bind(this);

    }

    componentDidMount() {

        (async () => {

            let getGroups = await getProductGroup();
            let groups = getGroups.map((val) => {
                return { value: val.id, label: val.name }
            });

            this.setState({
                productGroups: groups,
            });
        })();
    }

    saveItem() {

        let returnedData = '';
        (async () => {
            returnedData = await SaveCatalog(
                this.state.productName,
                this.state.manufacturer,
                this.state.price,
                this.state.productID,
                this.state.productGroupID
            );

            if (returnedData) {
                this.setState({
                    responseMessage: returnedData.data.Message
                })
                $('#saveCatalogModal').modal('toggle');
                // this.props.toggleDisplay();
                this.props.getCatalogs();
            }
        })();

    }

    render() {

        return (
            <React.Fragment>

                <form>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustom01">Product Name</label>
                            <input type="text" onChange={event => this.setState({ productName: event.target.value })}
                                value={this.state.productName} className="form-control" id="role_name" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustom02">Manufacturer</label>
                            <input type="text" onChange={event => this.setState({ manufacturer: event.target.value })}
                                value={this.state.manufacturer} className="form-control" id="role_name" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustomUsername">Price per unit</label>
                            <input type="number" onChange={event => this.setState({ price: event.target.value })}
                                value={this.state.price} className="form-control" id="role_name" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustomUsername">Product Id</label>
                            <input type="text" onChange={event => this.setState({ productID: event.target.value })}
                                value={this.state.productID} className="form-control" id="role_name" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationCustom01">Product Group</label>
                            <Select
                                // value={this.state.selectedValue}
                                onChange={(product) => {
                                    this.setState({
                                        productGroupID: product.value,
                                        // selectedValue: product
                                    });
                                }
                                }
                                placeholder="Search group"
                                options={this.state.productGroups}
                            />

                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sm-12">

                            <button type="button"
                                onClick={() => {
                                    this.saveItem();
                                    // $('#addItem').modal('toggle');
                                }}
                                className="btn btn-primary">Add
                            </button>
                        </div>
                    </div>
                </form>


                < div className="modal fade" id="saveCatalogModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalTitle" aria-hidden="true" >
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

export default NewItem;
