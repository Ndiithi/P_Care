import React from 'react';
import ReactDOM from 'react-dom';
import { saveProductGroup } from '../../utils/Helpers';
import DualListBox from 'react-dual-listbox';
import Select from 'react-select'

class NewItem extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            responseMessage: "",
            name: "",

        };
        this.saveItem = this.saveItem.bind(this);

    }

    componentDidMount() {


    }

    saveItem() {

        let returnedData = '';
        (async () => {
            returnedData = await saveProductGroup(
                this.state.name
            );

            if (returnedData) {
                this.setState({
                    responseMessage: returnedData.data.Message
                })
                $('#saveModal').modal('toggle');
                // this.props.toggleDisplay();
                this.props.getGroups();
            }
        })();

    }

    render() {

        return (
            <React.Fragment>

                <form>
                    <div className="form-row">
                        <div className="col-sm-5 mb-3">
                            <input placeholder='group name' type="text" onChange={event => this.setState({ name: event.target.value })}
                                value={this.state.name} className="form-control" id="role_name" required />
                            <div className="valid-feedback">
                                Looks good!
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="validationCustom02"></label>
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

export default NewItem;
