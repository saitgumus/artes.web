import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import ComboBox from "../ToolBox/combo-box";
import { VoteContract, VoteOption } from "../../Models/VoteContract";
import { CommonTypes } from "../../Types/Common";
import { GetApartmentListByManagerUserName } from "../../Services/MemberDefineService";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import {
  DateControlOlderToday,
  GetIntValue,
  IsBiggerDate,
  IsNullOrEmpty,
  ShowStatusError,
  ShowStatusSuccess,
  StringBuilder,
} from "../../Core/Helper";
import { Response, Severity } from "../../Core/Response";
import DynamicList from "../ToolBox/dynamic-list";
import { AddVote } from "../../Services/VoteService";

/**
 * Anket tanımlama komponenti
 */
class VoteDefining extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartmentList: [],
      voteContract: new VoteContract(),
    };
  }

  componentDidMount() {
    //#region yöneticisi olunan apartman listesi getirilir.
    this.props.actions.changeBackdropStatus(true);
    GetApartmentListByManagerUserName()
      .then((res) => {
        if (res && res.length > 0) {
          console.log("aparman list:", res);
          this.setState({ apartmentList: res });
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        this.props.actions.changeBackdropStatus(false);
      });

    //#endregion

    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.VoteDefine.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
    //#endregion
  }

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.Save:
        let validResponse = this.isValidContract(this.state.voteContract);
        if (validResponse.success) {
          this.props.actions.changeBackdropStatus(true);
          await AddVote(this.state.voteContract)
            .then((res) => {
              if (res.success) {
                ShowStatusSuccess("Anket gönderildi.");
              } else {
                ShowStatusError(res.getResultsStringFormat());
              }
            })
            .catch((e) => {
              ShowStatusError(e.message);
            })
            .finally(() => {
              this.props.actions.changeBackdropStatus(false);
            });
        } else {
          ShowStatusError(validResponse.getResultsStringFormat());
        }
        break;

      case CommonTypes.ActionKeys.Clean:
        break;
      default:
        break;
    }
  };

  //validation
  isValidContract = (contract) => {
    let strbuilder = new StringBuilder();

    if (GetIntValue(contract.apartmentId) < 1) {
      strbuilder.appendLine("Apartman seçiniz.");
    }
    if (IsNullOrEmpty(contract.name)) {
      strbuilder.appendLine("Anket adı girilmesi zorunludur..");
    }
    if (DateControlOlderToday(contract.startDate)) {
      strbuilder.appendLine("Bugünden küçük tarih girilemez.");
    }
    if (DateControlOlderToday(contract.endDate)) {
      strbuilder.appendLine("Bugünden küçük tarih girilemez.");
    }
    if (IsBiggerDate(contract.startDate, contract.endDate)) {
      strbuilder.appendLine(
        "Bitiş tarihi başlangıç tarihinden küçük olmamalıdır."
      );
    }

    let response = new Response();
    if (strbuilder.toString().length > 1) {
      response.addResult(strbuilder.toString(), Severity.Low);
      return response;
    } else {
      response.value = true;
      return response;
    }
  };

  render() {
    return (
      <Grid
        container
        spacing={2}
        justify={"center"}
        style={{ maxWidth: "700px" }}
      >
        <Grid item xs={12} sm={12}>
          <Paper elevation={0}>
            <ComboBox
              label={"Apartman"}
              onSelectedItemChange={(item) => {
                // addressId: 8
                // addressText: null
                // apartmentId: 5
                // apartmentManagerId: 1
                // blockList: null
                // cityId: 0
                // countyId: 0
                // managerUserName: null
                // name: "postmanTest"
                // zipCode: null
                // __proto__: Object
                console.log("selected apartmentId:", item.apartmentId);
                let dt = this.state.voteContract;
                dt.apartmentId = item.apartmentId;
                this.setState({ voteContract: dt });
              }}
              itemSource={this.state.apartmentList}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={0}>
            <TextField
              fullWidth
              type="text"
              label={"Anket Adı"}
              onChange={(e) => {
                let dt = this.state.voteContract;
                dt.name = e.target.value;

                this.setState({ voteContract: dt });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={0}>
            <TextField
              fullWidth
              type="text"
              label={"Açıklama"}
              onChange={(e) => {
                let dt = this.state.voteContract;
                dt.description = e.target.value;
                this.setState({ voteContract: dt });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={0}>
            <TextField
              fullWidth
              type="date"
              label={"Başlangıç Tarihi"}
              value={this.state.voteContract.startDate}
              onChange={(e) => {
                let contract = this.state.voteContract;
                contract.startDate = e.target.value;
                this.setState({ voteContract: contract });
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper elevation={0}>
            <TextField
              fullWidth
              type="date"
              label={"Bitiş Tarihi"}
              value={this.state.voteContract.endDate}
              onChange={(e) => {
                let contract = this.state.voteContract;
                contract.endDate = e.target.value;
                this.setState({ voteContract: contract });
              }}
            />
          </Paper>
        </Grid>

        {/*oy pusulası*/}
        <Grid item xs={12} sm={12}>
          <Paper elevation={0}>
            <DynamicList
              title={"Anket Seçenekleri"}
              onChangeList={(list) => {
                if (list && list.length > 0) {
                  let data = this.state.voteContract;
                  let tempList = [];

                  let ind = 0;
                  for (let tempListElement of list) {
                    let opt = new VoteOption();
                    opt.code = ++ind;
                    opt.description = tempListElement;
                    tempList.push(opt);
                  }
                  data.optionList = tempList;
                  this.setState({ voteContract: data });
                }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeBackdropStatus: bindActionCreators(
        pageActions.changeBackDropStatus,
        dispatch
      ),
      changeActiveResourceCode: bindActionCreators(
        pageActions.changeActiveResourceCode,
        dispatch
      ),
      executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteDefining);
