import React, { Component } from "react";
import { connect } from "react-redux";
import { DuesContract } from "../../Models/DuesContract";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import { CommonTypes, getDateIsoDate } from "../../Types/Common";
import {
  GetOneMonthAgo,
  ShowStatusError,
  ShowStatusInfo,
} from "../../Core/Helper";
import { GetDuesList } from "../../Services/Accounting";
import Grid from "@material-ui/core/Grid";
import ApartmentComponent from "../Common/apartment-component";
import DataTable from "../ToolBox/DataTable";
import { Paper } from "@material-ui/core";
import DateTimeComponent from "../ToolBox/datetime-component";

class DuesListing extends Component {
  columns = [
    {
      name: "apartmentName",
      label: "Apartman",
      options: { filter: true, sort: true },
    },
    {
      name: "fullName",
      label: "Kullanıcı",
      options: { filter: true, sort: true },
    },
    {
      name: "amount",
      label: "Aidat tutarı",
      options: { filter: true, sort: true },
    },
    {
      name: "approveStatusText",
      label: "Onay Durumu",
      options: { filter: true, sort: true },
    },
  ];

  constructor(props) {
    super(props);
    let initialContract = new DuesContract();
    initialContract.beginDate = GetOneMonthAgo(new Date());
    initialContract.endDate = getDateIsoDate();
    this.state = {
      dataContract: initialContract,
      dataList: [],
      selectedDues: {},
    };
  }

  componentDidMount() {
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.DuesListing.resourceCode
      );
    }

    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
  }

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.GetList:
        ShowStatusError("Metod not generated.");
        let filterContract = new DuesContract();
        filterContract.userId = 1002; //geçici
        let beginDate = new Date();
        filterContract.endDate = new Date();
        if (beginDate.getMonth() === 0) {
          var year = beginDate.getFullYear() - 1;
          beginDate.setFullYear(year);
          beginDate.setMonth(11);
        } else {
          var month = beginDate.getMonth() - 1;
          beginDate.setMonth(month);
        }

        filterContract.beginDate = beginDate;
        filterContract.endDate = new Date();

        GetDuesList(filterContract)
          .then((res) => {
            if (res.success) {
              if (res.value && res.value.length > 0) {
                this.setState({ dataList: res.value });
                ShowStatusInfo(res.value.length + " adet kayıt getirildi.");
              } else {
                this.setState({ dataList: [] });
                ShowStatusInfo("Kayıt bulunamadı.");
              }
            } else {
              ShowStatusError(res.getResultsStringFormat());
            }
          })
          .catch((err) => {
            ShowStatusError("İşlem yapılırken hata meydana geldi.");
            console.error(err);
          });
        break;

      case CommonTypes.ActionKeys.Examine:
        break;
      default:
        ShowStatusError("Metod not generated.");
        break;
    }
  };

  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Grid container direction={"column"}>
            <Grid item>
              <ApartmentComponent
                onChange={(apartment) => {
                  let contract = { ...this.state.dataContract };
                  contract.apartmentId = apartment.apartmentId;
                  contract.apartmentName = apartment.name;
                  this.setState({ dataContract: contract });
                }}
              />
            </Grid>
            <Grid item>
              <DateTimeComponent
                label={"Başlangıç Tarihi"}
                defaultDate={this.state.dataContract.beginDate}
                onChangeDate={(date) => {
                  let contract = { ...this.state.dataContract };
                  contract.beginDate = date;
                  this.setState({ dataContract: contract });
                }}
              />
            </Grid>
            <Grid item>
              <DateTimeComponent
                label={"Bitiş Tarihi"}
                onChangeDate={(date) => {
                  console.log("Bitiş tarihi:", date);
                  let contract = { ...this.state.dataContract };
                  contract.endDate = date;
                  this.setState({ dataContract: contract });
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            <DataTable
              columns={this.columns}
              data={this.state.dataList}
              onSelectedItemChange={(
                currentRowIndex,
                allRowsIndexes,
                rowsSelectedIndex
              ) => {
                let selected = this.state.dataList[rowsSelectedIndex[0]];
                if (selected && selected.duesId > 0) {
                  this.setState({ selectedDues: selected });
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

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

export default connect(mapStateToProps, mapDispatchToProps)(DuesListing);
