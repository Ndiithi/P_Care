import React from 'react';
import Select from 'react-select'
import { getCatalogs, saveProduct } from '../utils/Helpers';


class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            selectedValue: {},
            productId: '',
            batchNumber: '',
            expiryDate: '',
            noOfItems: ''
        }
        this.getCatalogs = this.getCatalogs.bind(this);
        this.saveItem = this.saveItem.bind(this);

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
            console.log(catalogs);
            this.setState({
                catalogs: catalogs,
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
                // this.props.toggleDisplay();
                getCatalogs();
            }
        })();

    }


    componentDidUpdate(prevProps, prevState) {

    }

    render() {

        return (
            <React.Fragment>
                < div className="modal  fade" id="addItem" tabIndex="-1" role="dialog" aria-labelledby="addItemTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="addItem">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="saveRoleModalTitle">Add Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form noValidate>
                                    <div class="form-row">
                                        <div class="col-md-4 mb-3">
                                            <label for="validationCustom01">Product</label>
                                            {/* <input type="text" class="form-control" id="validationCustom01" required /> */}
                                            <Select
                                                // value={this.state.selectedValue}
                                                onChange={(product) => {
                                                    this.setState({
                                                        productID: product.value,
                                                        selectedValue: product
                                                    });
                                                }
                                                }
                                                options={this.state.catalogs}
                                            />
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationCustom02">No of items</label>
                                            <input type="number" onChange={(event) => this.setState({
                                                noOfItems: event.target.value
                                            })} class="form-control" id="validationCustom02" required />
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationCustomUsername">Expiry date</label>
                                            <input type="date" onChange={(event) => this.setState({
                                                expiryDate: event.target.value
                                            })}
                                                class="form-control" id="validationCustom02" required />
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6 mb-3">
                                            <label for="validationCustom03">Batch Number</label>
                                            <input onChange={(event) => this.setState({
                                                batchNumber: event.target.value
                                            })}
                                                type="text" class="form-control" id="validationCustom03" required />
                                            <div class="invalid-feedback">
                                                Please provide a valid Batch Number.
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                    onClick={() => {
                                        this.saveItem();
                                    }}
                                    className="btn btn-primary">Submit form
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div >


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
