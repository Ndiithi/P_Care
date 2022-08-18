import React from 'react';
import ReactDOM from 'react-dom';
import { FetchAuthorities, SaveRole, UpdateRole, FetchUserAuthorities } from '../../utils/Helpers';
import DualListBox from 'react-dual-listbox';


class NewItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {


    }


    render() {

        return (
            <React.Fragment>

                <form>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom01">Product Name</label>
                            <input type="text" className="form-control" id="validationCustom01" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom02">Manufacturer</label>
                            <input type="text" className="form-control" id="validationCustom02" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustomUsername">Price per unit</label>
                            <input type="text" className="form-control" id="validationCustom02" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sm-12">
                            <button type="button"
                                onClick={() => {

                                    // $('#addItem').modal('toggle');
                                }}
                                className="btn btn-primary">Add
                            </button>
                        </div>
                    </div>
                </form>

            </React.Fragment>
        );
    }

}

export default NewItem;
