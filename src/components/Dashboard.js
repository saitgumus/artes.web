import React, {Component} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {bindActionCreators} from "redux";
import * as pageActions from "../redux/actions/page-actions";
import {connect} from "react-redux";
import {CommonTypes} from "../Types/Common";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.dashboard.resourceCode
            );
        }
    }

    render() {
        return (
            <Grid container spacing={3} direction="column" alignItems="center">
                <Grid item md={8}>
                    <Typography title variant={"h4"}>
                        MOLAiNN Management System
                    </Typography>
                </Grid>
                <Grid item md={8}>
                    <img alt="brassco"
                         src={"https://www.brassco.com.tr/resimler/marka/459-brassco-logo-500x500p.jpg"}/>
                </Grid>
            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            changeActiveResourceCode: bindActionCreators(
                pageActions.changeActiveResourceCode,
                dispatch
            ),
            executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);