import React from 'react';
import ReactDOM from 'react-dom';


import { v4 as uuidv4 } from 'uuid';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { predict } from '../../utils/Helpers';

class Miner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }

    }

    componentDidMount() {
        (async () => {

            let data = await predict();
            console.log(data);
            // this.setState({
            //     tableData: sales,
            //     allTableElements: []
            // });
        })();

    }

 
    render() {


        return (
            <React.Fragment>

                test 2

            </React.Fragment>
        );
    }

}

export default Miner;

if (document.getElementById('mining')) {
    ReactDOM.render(<Miner />, document.getElementById('mining'));
}
