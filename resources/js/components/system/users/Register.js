import React from 'react';
import ReactDOM from 'react-dom';
import { FetchRoles, Saveuser, FetchUserDetails, Updateuser } from '../../utils/Helpers';
import DualListBox from 'react-dual-listbox';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedViewableRoles: [],
            previousSelectedViewableRoles: [],
            role: '',
            roles: {},
            rolesOptions: [],
            message: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            closeRegisterPage: true,
            canViewAssignRolesList: false,
            showPasswordValidationErrors: false
        };

        this.saveUser = this.saveUser.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
        this.roleOnChange = this.roleOnChange.bind(this);
        this.viewableRolesOnChange = this.viewableRolesOnChange.bind(this);
        this.replaceWithBr = this.replaceWithBr.bind(this);

    }

    componentDidMount() {
        (async () => {
            let roles = await FetchRoles();

            if (this.props.userActionState == 'edit') {

                let userDetails = await FetchUserDetails(this.props.selectedUser.id);

                let canViewAssignRolesList = false;
                try {
                    canViewAssignRolesList = roles[userDetails['demographics']['role_id']]['authorities']['role'].includes(12) // check if has view role option 
                } catch (err) {
                    //pass
                }

                this.setState({
                    first_name: userDetails['demographics']['first_name'],
                    last_name: userDetails['demographics']['last_name'] ? userDetails['demographics']['last_name'] : '',
                    email: userDetails['demographics']['email'],
                    role: userDetails['demographics']['role_id'],
                    roleId: userDetails['demographics']['role_id'],
                    selectedViewableRoles: userDetails['allowed_roles'],
                    previousSelectedViewableRoles: userDetails['allowed_roles'],
                    canViewAssignRolesList: canViewAssignRolesList
                });
            }


            let rolesOptions = [];

            for (const [key, value] of Object.entries(roles)) {
                rolesOptions.push({ value: value.role_id, label: value.role_name });
            }

            this.setState({
                roles: roles,
                rolesOptions: rolesOptions
            });
        })();
    }

    viewableRolesOnChange(selected) {
        this.setState({ selectedViewableRoles: selected });
    };

    updateCurrentUser() {
        if (this.state.first_name.length == 0 ||
            this.state.email.length == 0) {

            this.setState({
                message: "Kindly fill in the required data marked in *",
                closeRegisterPage: false
            });
            $('#saveUserModal').modal('toggle');
        } else {

            Updateuser(
                this.state.first_name,
                this.state.last_name,
                this.state.email,
                this.state.password,
                this.state.role,
                this.props.selectedUser.id,
                this.state.selectedViewableRoles
            ).then(response => {
                let message = response.data.Message

                this.setState({
                    message: message
                });

                $('#saveUserModal').modal('toggle');
            });

        }
    }

    saveUser() {

        (async () => {

            if (
                this.state.first_name.length == 0 ||
                this.state.email.length == 0 ||
                this.state.password.length == 0 ||
                this.state.role.length == 0

            ) {
                this.setState({
                    message: "Kindly fill in the required data marked in *",
                    closeRegisterPage: false
                });
                $('#saveUserModal').modal('toggle');
                return
            }

            // let paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (!paswd.test(this.state.password)) {
                let msg = "Hello" + "\n" + "world";
                this.setState({
                    message: "Password does not meet threshold",
                    closeRegisterPage: false,
                    showPasswordValidationErrors: true,
                });
                $('#saveUserModal').modal('toggle');
                return
            }

            let response = await Saveuser(
                this.state.first_name,
                this.state.last_name,
                this.state.email,
                this.state.password,
                this.state.role,
                this.state.selectedViewableRoles
            );

            if (response) {

                this.setState({
                    message: response.data.Message,
                    showPasswordValidationErrors: false,
                });

                $('#saveUserModal').modal('toggle');
            }


        })();
    }

    roleOnChange(event) {
        // //console.log(event.target.value);
        let roleId = event.target.value;
        let canViewAssignRolesList = false;

        try {
            if (this.state.roles[roleId].authorities.role.includes(12)) {
                canViewAssignRolesList = true
            }
        } catch (err) {

        }
        let SelectedViewableRoles = [];
        if (canViewAssignRolesList == false) {
            SelectedViewableRoles = [];
        } else {
            SelectedViewableRoles = this.state.previousSelectedViewableRoles
        }

        // viewAssignRolesList
        this.setState({
            role: roleId,
            selectedViewableRoles: SelectedViewableRoles,
            canViewAssignRolesList: canViewAssignRolesList
        });
    };

    replaceWithBr(txt) {
        return txt.replace(/\n/g, "<br />")
    }


    // render
    render() {
        let roles = [];
        for (const [key, value] of Object.entries(this.state.roles)) {

            if (this.props.userActionState == 'edit') {
                if (this.state.roleId == value.role_id) {
                    roles.push(<option selected key={key} value={key}>{value.role_name}</option>);
                } else {
                    roles.push(<option key={key} value={key}>{value.role_name}</option>);
                }

            } else {
                roles.push(<option key={key} value={key}>{value.role_name}</option>);
            }

        }
        let count = 1;

        return (
            <React.Fragment>

                <div id="registration_form" className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Registration Form</h6>
                    </div>
                    <div className="card-body">

                        <div className="card mb-4 py-3 border-left-secondary">
                            <div className="card-body">
                                {
                                    this.state.showPasswordValidationErrors ?
                                        <div style={{ "color": "red" }}>
                                            <p>
                                                Password must: <br/>

                                                1. be 6-16 charcters long <br/>
                                                2. one numeric digit <br/>
                                                3. one special character 
                                            </p>
                                            <p></p>
                                        </div>
                                        :
                                        ""}
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationTooltip01">First name *</label>
                                        <input type="text"
                                            onChange={(event) => {
                                                this.setState({
                                                    first_name: event.target.value
                                                });
                                            }}
                                            value={this.state.first_name}
                                            className="form-control"
                                            id="validationTooltip01" required />
                                        <div className="valid-tooltip">user first name</div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationTooltip02">Last name</label>
                                        <input
                                            onChange={(event) => {
                                                this.setState({
                                                    last_name: event.target.value
                                                });
                                            }}
                                            value={this.state.last_name}
                                            type="text"
                                            className="form-control"
                                            id="validationTooltip02" required />
                                        <div className="valid-tooltip">user last name</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationTooltip03">Email *</label>
                                        <input
                                            onChange={(event) => {
                                                this.setState({
                                                    email: event.target.value
                                                });
                                            }}
                                            value={this.state.email}
                                            type="text"
                                            className="form-control"
                                            id="validationTooltip03" required />
                                        <div className="invalid-tooltip">Please provide a valid Email. </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationTooltip05">Role *</label>
                                        <select onChange={() => this.roleOnChange(event)} className="form-control" id="exampleFormControlSelect1">
                                            <option defaultValue>--Select user role--</option>
                                            {roles}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="validationTooltip04">Password {this.props.userActionState != 'edit' ? ' *' : ''}</label>
                                        <input type="text"
                                            onChange={(event) => {
                                                this.setState({
                                                    password: event.target.value
                                                });
                                            }}
                                            className="form-control"
                                            id="validationTooltip04"
                                            required />
                                        <div className="invalid-tooltip">Please provide a valid Email. </div>
                                    </div>
                                </div>
                                {
                                    this.state.canViewAssignRolesList || this.state.selectedViewableRoles.length != 0 ?
                                        <React.Fragment>
                                            <br />
                                            <div className="col-md-12 mb-12">
                                                <label htmlFor="permissions">Assign roles this user will view</label>
                                                <DualListBox
                                                    canFilter
                                                    options={this.state.rolesOptions}
                                                    selected={this.state.selectedViewableRoles}
                                                    onChange={this.viewableRolesOnChange}
                                                />
                                            </div>
                                        </React.Fragment> : ''
                                }

                                <br />
                                <div className="form-row">
                                    <div className="col-md-6 mb-6">
                                        <div style={{ "overflow": "scroll", "maxHeight": "100px", "minHeight": "100px", "paddingBottom": "6px", "paddingRight": "16px" }} >
                                        </div>
                                    </div>

                                </div>

                                <button
                                    onClick={this.props.userActionState != 'edit' ? () => this.saveUser() : () => this.updateCurrentUser()}
                                    style={{ "marginTop": "10px" }}
                                    className="btn btn-primary mr-2"
                                > {this.props.userActionState == 'edit' ? 'Update User' : 'Save User'}</button>

                                <button
                                    style={{ "marginTop": "10px" }}
                                    onClick={
                                        () => {
                                            this.setState({
                                                selectedViewableRoles: [],
                                                previousSelectedViewableRoles: [],
                                                role: '',
                                                roles: {},
                                                rolesOptions: [],
                                                message: '',
                                                first_name: '',
                                                last_name: '',
                                                email: '',
                                                password: '',
                                                closeRegisterPage: true,
                                                canViewAssignRolesList: false
                                            });
                                            this.props.toggleDisplay()
                                        }
                                    } className="btn btn-secondary">Cancel</button>

                            </div>
                        </div>

                    </div>
                </div>
                {/* user persist alert box */}
                <div className="modal fade" id="saveUserModal" tabIndex="-1" role="dialog" aria-labelledby="saveUserModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Notice!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p id="modal-message">
                                    {this.state.message}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                    onClick={
                                        this.state.closeRegisterPage ? () => this.props.toggleDisplay() : ''
                                    }
                                    className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Register;
