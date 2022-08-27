import React from 'react';

class AddItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {

        return (
            <React.Fragment>
                < div className="modal fade" id="addItem" tabIndex="-1" role="dialog" aria-labelledby="addItemTitle" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="addItem">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="saveRoleModalTitle">Add Product</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form novalidate>
                                    <div class="form-row">
                                        <div class="col-md-4 mb-3">
                                            <label for="validationCustom01">Product</label>
                                            <input type="text" class="form-control" id="validationCustom01" required />
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationCustom02">No of items</label>
                                            <input type="text" class="form-control" id="validationCustom02" required />
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div class="col-md-4 mb-3">
                                            <label for="validationCustomUsername">Expiry date</label>
                                            <input type="date" class="form-control" id="validationCustom02"  required />
                                            <div class="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="col-md-6 mb-3">
                                            <label for="validationCustom03">Batch Number</label>
                                            <input type="text" class="form-control" id="validationCustom03" required />
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

                                        $('#addItem').modal('toggle');
                                    }}
                                    className="btn btn-primary">Submit form
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div >
            </React.Fragment>
        );
    }
}

export default AddItem;