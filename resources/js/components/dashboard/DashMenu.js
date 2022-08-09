import React from 'react';
import StatsLabel from '../utils/stats/StatsLabel';

class DashMenu extends React.Component {

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

                <div className="row">

                    <div className="col-xl-3">
                        <a href='#'>

                            <StatsLabel
                                textStyling={'text-primary'}
                                text={'POS'}
                                value={this.state.externalQualityAssessment}
                                faIcon={'far fa-people-arrows'}
                                faIconColor={'blue'}
                            ></StatsLabel>
                        </a>
                    </div>

                    <div className="col-xl-3 ">
                        <a href='#'>
                            <StatsLabel
                                textStyling={'text-success'}
                                text={'Add products'}
                                value={this.state.overallPerformance}
                                faIcon={'fa-folder-plus'}
                                faIconColor={'#944dff'}
                            ></StatsLabel>
                        </a>
                    </div>

                    <div className="col-xl-3 ">
                        <a href='/reports/sales'>
                            <StatsLabel
                                textStyling={'text-info'}
                                text={'Sales Report'}
                                value={this.state.personellTrainingAndCertification}
                                faIcon={'fa-chart-bar'}
                                faIconColor={'#4d88ff'}
                            ></StatsLabel>
                        </a>
                    </div>

                    <div className="col-xl-3 ">
                        <a href='/reports/stocks'>
                            <StatsLabel
                                textStyling={' text-warning'}
                                text={'Stocks Reports'}
                                value={this.state.physicalFacility}
                                faIcon={'fa-store'}
                                faIconColor={'#00b3b3'}
                            ></StatsLabel>
                        </a>
                    </div>
                </div>

                <div style={{ "margin-top": "10px" }} className="row">

                    <div className="col-xl-3 ">
                        <a href='/reports/purchases'>
                            <StatsLabel
                                textStyling={' text-warning'}
                                text={'Purchase Reports'}
                                value={this.state.physicalFacility}
                                faIcon={'fa-coins'}
                                faIconColor={'#003399'}
                            ></StatsLabel>
                        </a>
                    </div>

                    <div className="col-xl-3 ">
                        <a href='/reports/mining'>
                            <StatsLabel
                                textStyling={' text-warning'}
                                text={'Data mining'}
                                value={this.state.physicalFacility}
                                faIcon={'fa-database'}
                                faIconColor={'#669999'}
                            ></StatsLabel>
                        </a>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default DashMenu;
