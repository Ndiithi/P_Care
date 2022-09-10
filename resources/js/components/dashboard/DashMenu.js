import React from 'react';
import AddItem from '../add_item/AddItem';
import StatsLabel from '../utils/stats/StatsLabel';
import { FetchUserAuthorities } from '../utils/Helpers';

class DashMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allowedPermissions: []
        }
    }

    componentDidMount() {
        (async () => {
            let allowedPermissions = await FetchUserAuthorities();
            this.setState({
                allowedPermissions: allowedPermissions
            });

        })();

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {

        return (
            <React.Fragment>

                <div className="row">


                    {
                        this.state.allowedPermissions.length > 0 &&
                            this.state.allowedPermissions.includes('view_pos') ?
                            <div className="col-xl-3">

                                <a href='/service/pos'>
                                    <StatsLabel
                                        textStyling={'text-primary'}
                                        text={'POS'}
                                        value={this.state.externalQualityAssessment}
                                        faIcon={'far fa-people-arrows'}
                                        faIconColor={'blue'}
                                    ></StatsLabel>
                                </a></div> : ""

                    }


                    <div className="col-xl-3 ">
                        <a href="#" onClick={
                            () => { $('#addItem').modal('toggle'); }
                        }>
                            <StatsLabel
                                textStyling={'text-success'}
                                text={'Add products'}
                                value={this.state.overallPerformance}
                                faIcon={'fa-folder-plus'}
                                faIconColor={'#944dff'}
                            ></StatsLabel>
                        </a>
                    </div>



                    {
                        this.state.allowedPermissions.length > 0 &&
                            this.state.allowedPermissions.includes('view_sales_report') ?
                            <div className="col-xl-3 ">
                                <a href='/reports/sales'>
                                    <StatsLabel
                                        textStyling={'text-info'}
                                        text={'Sales Report'}
                                        value={this.state.personellTrainingAndCertification}
                                        faIcon={'fa-chart-bar'}
                                        faIconColor={'#4d88ff'}
                                    ></StatsLabel>
                                </a> </div> : ""
                    }


                    {
                        this.state.allowedPermissions.length > 0 &&
                            this.state.allowedPermissions.includes('view_stocks_report') ?
                            <div className="col-xl-3 ">
                                <a href='/reports/stocks'>
                                    <StatsLabel
                                        textStyling={' text-warning'}
                                        text={'Stocks Reports'}
                                        value={this.state.physicalFacility}
                                        faIcon={'fa-store'}
                                        faIconColor={'#00b3b3'}
                                    ></StatsLabel>
                                </a> </div> : ""
                    }

                </div>

                <div style={{ "marginTop": "10px" }} className="row">

                    {
                        this.state.allowedPermissions.length > 0 &&
                            this.state.allowedPermissions.includes('view_purchases_report') ?
                            <div className="col-xl-3 ">

                                <a href='/reports/purchases'>
                                    <StatsLabel
                                        textStyling={' text-warning'}
                                        text={'Purchase Reports'}
                                        value={this.state.physicalFacility}
                                        faIcon={'fa-coins'}
                                        faIconColor={'#003399'}
                                    ></StatsLabel>
                                </a> </div> : ""
                    }


                    {
                        this.state.allowedPermissions.length > 0 &&
                            this.state.allowedPermissions.includes('view_datamining_module') ?
                            <div className="col-xl-3 ">
                                <a href='/reports/mining'>
                                    <StatsLabel
                                        textStyling={' text-warning'}
                                        text={'Data mining'}
                                        value={this.state.physicalFacility}
                                        faIcon={'fa-database'}
                                        faIconColor={'#669999'}
                                    ></StatsLabel>
                                </a> </div> : ""
                    }

                </div>

                <AddItem />
            </React.Fragment>
        );
    }
}

export default DashMenu;
