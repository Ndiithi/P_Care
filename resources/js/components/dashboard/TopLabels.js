import React from 'react';
import StatsLabel from '../utils/stats/StatsLabel';

class TopLabels extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            externalQualityAssessment: 0,
            overallPerformance: 0,
            personellTrainingAndCertification: 0,
            physicalFacility: 0,
            timeLine: 'Follow2'
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.serverData != this.props.serverData
        ) {

            console.log("data to parse =====>");
            console.log(this.props.serverData);

            if (Array.isArray(this.props.serverData)) {
                console.log("data processing =====>");
                console.log(this.props.serverData);
                this.props.serverData.map((dataObjectParent) => {

                    this.setState({
                        externalQualityAssessment: dataObjectParent['ExternalQualityAssessment']['follow2'],
                        overallPerformance: dataObjectParent['OverallPerformance']['follow2'],
                        personellTrainingAndCertification: dataObjectParent['PersonellTrainingAndCertification']['follow2'],
                        physicalFacility: dataObjectParent['PhysicalFacility']['follow2']
                    });

                });

            } else {
                

            }


        }

    }

    render() {

        return (

            <div className="row">

                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsLabel
                        textStyling={'text-primary'}
                        borderStyling={'border-left-primary'}
                        text={'Total Stocks by product' + ` ${this.state.timeLine}`}
                        value={this.state.externalQualityAssessment}
                        faIcon={'fa-hands'}
                    ></StatsLabel>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsLabel
                        textStyling={'text-success'}
                        borderStyling={'border-left-success'}
                        text={'Stocks expiring next 30 days' + ` ${this.state.timeLine}`}
                        value={this.state.overallPerformance}
                        faIcon={'fa-book'}
                    ></StatsLabel>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsLabel
                        textStyling={'text-info'}
                        borderStyling={'border-left-info'}
                        text={'Out of stock' + ` ${this.state.timeLine}`}
                        value={this.state.personellTrainingAndCertification}
                        faIcon={'fa-certificate'}
                    ></StatsLabel>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <StatsLabel
                        textStyling={' text-warning'}
                        borderStyling={'border-left-warning'}
                        text={'Consumption rates' + ` ${this.state.timeLine}`}
                        value={this.state.physicalFacility}
                        faIcon={'fa-hands-helping'}
                    ></StatsLabel>
                </div>

            </div>
        );
    }
}

export default TopLabels;
