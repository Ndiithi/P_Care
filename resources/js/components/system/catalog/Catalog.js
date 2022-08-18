import React from 'react';
import ReactDOM from 'react-dom';
import { FetchRoles, DeleteRole, FetchUserAuthorities } from '../../utils/Helpers';

class Catalog extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            
        }
        // this.onChange = this.onChange.bind(this);
        
    }

   

    render() {

        return (
            <React.Fragment>
                
                
            </React.Fragment>
        );
    }

}

export default Catalog;

if (document.getElementById('Catalog')) {
    ReactDOM.render(<Catalog />, document.getElementById('Catalog'));
}