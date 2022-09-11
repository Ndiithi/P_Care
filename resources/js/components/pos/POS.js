import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import NewItem from './AddItem';

import { v4 as uuidv4 } from 'uuid';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { getCatalogs } from '../utils/Helpers';

class POS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catalogs: [],
            currCatalogTableEl: [],
            allTableElements: [],
            selectedCatalog: null,
            allowedPermissions: [],
            catalogActionState: 'catalogList',
            startTableData: 0,
            endeTableData: 10,
            activePage: 1,
        }
        this.getCatalogs = this.getCatalogs.bind(this);


    }

    componentDidMount() {

        this.getCatalogs();

    }

    getCatalogs() {
        (async () => {

            let catalogs = await getCatalogs();
            this.setState({
                catalogs: catalogs,
                allTableElements: []
            });
        })();
    }


    render() {


        return (
            <React.Fragment>
                <h1 className="h4 mb-0 text-gray-500">POS</h1>
                <br />
                <NewItem />
                <br />
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
