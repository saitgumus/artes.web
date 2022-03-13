import React, { Component } from 'react';
import { CommonTypes } from "../Types/Common";
import * as pageActions from "../redux/actions/page-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card, Grid, Typography } from "@material-ui/core";
import DataTable from "./ToolBox/DataTable";


export class Distributor extends Component {

  columns = [
    {
      name: "number",
      label: "Number",
      options: { filter: true, sort: true },
    },
    {
      name: "distributorName",
      label: "Distributor Name",
      options: { filter: true, sort: true },
    },
    {
      name: "contact",
      label: "Contact",
      options: { filter: true, sort: true },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      options: { filter: true, sort: true },
    },
    {
      name: "email",
      label: "Email",
      options: { filter: true, sort: true },
    },
    {
      name: "created At",
      label: "Created At",
      options: { filter: true, sort: true },
    },
    {
      name: "hotelAmount",
      label: "Hotel Amount",
      options: { filter: true, sort: true },
    },
    {
      name: "subordinateDistributor",
      label: "Subordinate Distributor",
      options: { filter: true, sort: true },
    },
    {
      name: "options",
      label: "Options",
      options: { filter: true, sort: true },
    },
  ];

  componentDidMount() {
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.distributor.resourceCode
      );
    }
  }

  render() {
    return (
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant='h4'>
              Distributor
            </Typography>
          </Grid>
        <Grid item>
          <Card elevation={1}>
            <DataTable
            columns = {this.columns}
            data={[]}
            onSelectedItemChange={(
              currentRowIndex,
              allRowsIndexes,
              rowsSelectedIndex
            )=>{
              
            }
          }
            ></DataTable>
          </Card>
        </Grid>
          
      </Grid>
    )
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Distributor);
