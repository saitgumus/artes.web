import React, { Component } from "react";
import { CommonTypes } from "../Types/Common";
import * as pageActions from "../redux/actions/page-actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card, Grid, Typography } from "@material-ui/core";
import DataTable from "./ToolBox/DataTable";

class Home extends Component {
  static displayName = Home.name;

  columns = [
    {
      name: "hotelName",
      label: "Hotel Name",
      options: { filter: true, sort: true },
    },
    {
      name: "adminName",
      label: "Admin Name",
      options: { filter: true, sort: true },
    },
    {
      name: "administrator",
      label: "Administrator",
      options: { filter: true, sort: true },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: { filter: true, sort: true },
    },
    {
      name: "validSectors",
      label: "Valid Sectors",
      options: { filter: true, sort: true },
    },
    {
      name: "allowGeneralCard",
      label: "Allow General Card",
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
        CommonTypes.Resources.home.resourceCode
      );
    }

    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
  }

  dialogContent = (<div></div>)

  onExecute = async (key) => {
    switch (key) {

      //incele / ayrıntılar
      case CommonTypes.ActionKeys.Read:
        /**
         * 
          this.dialogContent = (
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{ backgroundColor: "#26bdba" }}
                  >
                    {messageContract.senderFirstName
                      ? messageContract.senderFirstName.substr(0, 1)
                      : "S"}
                  </Avatar>
                }
                title={messageContract.senderFullName}
                subheader={messageContract.sendDate}
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                  Mesaj içeriği..
                </Typography>

                <Typography variant="body1" color="textPrimary" component="p">
                  {messageContract.message}
                </Typography>
              </CardContent>
            </Card>
          );
         */
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Grid container direction="column" spacing={3}>
        <Grid item>
            <Typography variant='h4'>
              Hotel
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
