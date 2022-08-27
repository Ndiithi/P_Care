import React from 'react';
import ReactDOM from 'react-dom';
import DualListBox from 'react-dual-listbox';
import { FetchUserAuthorities } from '../utils/Helpers';


class AddItem extends React.Component {


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
                        <div className="col-md-8 col-sm-8">
                            <input type="text" className="form-control" placeholder='Search Product' id="validationCustom01" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">

                            <button type="button"

                                onClick={() => {

                                    // $('#addItem').modal('toggle');
                                }}
                                className="btn btn-info">
                                <i className="fas fa-plus-circle"></i> Add
                            </button>
                        </div>

                    </div>

                </form>

            </React.Fragment>
        );
    }

}

export default AddItem;
