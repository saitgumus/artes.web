import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonTypes } from "../../../Types/Common";
import { bindActionCreators } from "redux";
import * as pageActions from "../../../redux/actions/page-actions";
import { TextField, Grid, Paper } from "@material-ui/core";
import {
  GetApartmentListByManagerUserName,
  SaveNewMember,
  GetMemberDetailByMemberId,
  UpdateMemberUser,
} from "../../../Services/MemberDefineService";
import ComboBox from "../../ToolBox/combo-box";
import { MemberUserContract } from "../../../Models/MemberUserContract";
import {
  ShowStatusError,
  ShowStatusSuccess,
  StringBuilder,
} from "../../../Core/Helper";
import { Response, Severity } from "../../../Core/Response";

const style = {
  root: {
    flexGrow: 1,
    margin: 10,
    backgroundColor: "white",
  },
};

/**
 * üye tanımlama
 */
class MemberDefine extends Component {
  static propTypes = {};

  updateContract = {};
  //   addressId: 0
  // addressText: "mersin erdemli asdf"
  // apartmentId: 5
  // apartmentName: null
  // doorNumber: 7
  // email: "qwe@qwe.com"
  // firstName: "qwd"
  // floorNumber: 7
  // lastName: "ase"
  // memberId: 6
  // postCode: "12345"
  // roleId: 0
  // roleName: null
  // userId: 0
  // userName: ""

  constructor(props) {
    super(props);
    this.dataContract = new MemberUserContract();
    this.dataContract = {
      firstName: "",
      lastName: "",
      email: "",
      floorNumber: 0,
      doorNumber: 0,
      apartmentId: 0,
    };
    this.state = {
      apartmentList: [],
      isMailValid: undefined,
      dataContract: this.dataContract,
      isUpdate: false,
    };
  }

  //#region life cycle

  componentDidMount() {
    let isUpdate = false;
    let dtContract = {};

    if (this.props.location.state && this.props.location.state.isUpdate) {
      dtContract = this.props.location.state.dataContract;
      isUpdate = true;
      this.setState({ isUpdate: true });
      //this.setState({ updateContract: contract, isUpdate: true });
    }

    this.props.actions.changeBackdropStatus(true);

    //#region yöneticisi olunan apartman listesi getirilir.

    GetApartmentListByManagerUserName()
      .then((res) => {
        if (res && res.length > 0) {
          this.setState({ apartmentList: res });
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        this.props.actions.changeBackdropStatus(false);
      });

    //#endregion

    //#region update ise üye bilgisi alınır.

    if (isUpdate && dtContract.memberId > 0) {
      this.props.actions.changeBackdropStatus(true);

      GetMemberDetailByMemberId(dtContract.memberId)
        .then((res) => {
          if (res.success) {
            this.setState({ dataContract: res.value });
          } else {
            console.log(res.results);
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          this.props.actions.changeBackdropStatus(false);
        });
    }

    //#endregion

    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.defineMember.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
    //#endregion
  }

  //#endregion

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.Save:
        let validateResponse = this.isValidContract(this.state.dataContract);
        if (validateResponse.success) {
          this.props.actions.changeBackdropStatus(true);
          if (this.state.isUpdate) {
            //#region güncelleme yapılır

            await UpdateMemberUser(this.state.dataContract)
              .then((res) => {
                if (res.success) {
                  ShowStatusSuccess("Kayıt Güncellendi.");
                } else {
                  ShowStatusError(res.getResultsStringFormat());
                }
              })
              .catch((e) => console.log(e))
              .finally(() => {
                this.props.actions.changeBackdropStatus(false);
              });
            //#endregion
          } else {
            //#region yeni üye kaydı yapılır.

            await SaveNewMember(this.state.dataContract)
              .then((res) => {
                if (res.status === 201) {
                  ShowStatusSuccess("Yeni üye kaydı yapıldı.");
                  this.props.history.push({ pathname: "/" });
                }
              })
              .catch((e) => console.log(e))
              .finally(() => {
                this.props.actions.changeBackdropStatus(false);
              });
            //#endregion
          }
        } else {
          ShowStatusError(validateResponse.getResultsStringFormat());
        }
        break;

      case CommonTypes.ActionKeys.Clean:
        this.dataContract = new MemberUserContract();
        this.setState({ dataContract: new MemberUserContract() });

        break;
      default:
        break;
    }
  };

  isValidContract(contract) {
    let strbuilder = new StringBuilder();

    if (!contract.firstName || contract.firstName.length < 1) {
      strbuilder.appendLine("üye adı girilmesi zorunludur..");
    }
    if (!contract.lastName || contract.lastName.length < 1) {
      strbuilder.appendLine("üye soyadı girilmesi zorunludur.");
    }
    if (!contract.email || contract.email.length < 1) {
      strbuilder.appendLine("email girilmesi zorunludur.");
    }
    if (
      !contract.floorNumber ||
      contract.floorNumber < 1 ||
      !contract.doorNumber ||
      contract.doorNumber < 1
    ) {
      strbuilder.appendLine("kat ve daire numarası girilmesi zorunludur.");
    }

    let response = new Response();
    if (strbuilder.toString().length > 1) {
      response.addResult(strbuilder.toString(), Severity.Low);
      return response;
    } else {
      response.value = 1;
      return response;
    }
  }

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = this.state.isMailValid;
    isValid = !emailRex.test(e.target.value);
    this.setState({ isMailValid: isValid });
  }

  render() {
    return (
      <div style={style.root} className={"apman-layout-root"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Paper elevation={0}>
              <ComboBox
                label={"Apartman"}
                onSelectedItemChange={(item) => {
                  console.log("selected apartmentId:", item.apartmentId);
                  let dt = this.state.dataContract;
                  dt.apartmentId = item.apartmentId;
                  dt.addressId = item.addressId;
                  this.setState({ dataContract: dt });
                }}
                itemSource={this.state.apartmentList}
                defaultValue={
                  this.state.apartmentList.length > 1
                    ? this.state.apartmentList.find(
                        (r) =>
                          r.apartmentId === this.state.dataContract.apartmentId
                      )
                    : undefined
                }
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                label="Ad"
                fullWidth
                onChange={(e) => {
                  var dt = this.state.dataContract;
                  dt.firstName = e.target.value;
                  this.setState({ dataContract: dt });
                }}
                value={this.state.dataContract.firstName}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                label="Soyad"
                fullWidth
                onChange={(e) => {
                  var dt = this.state.dataContract;
                  dt.lastName = e.target.value;
                  this.setState({ dataContract: dt });
                }}
                value={this.state.dataContract.lastName}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                label="Mail"
                type={"email"}
                fullWidth
                error={this.state.isMailValid}
                onChange={(e) => {
                  var dt = this.state.dataContract;
                  dt.email = e.target.value;
                  this.setState({ dataContract: dt });
                }}
                onBlur={(e) => {
                  this.validateEmail(e);
                }}
                autoComplete={"username"}
                value={this.state.dataContract.email}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                label="Kat"
                type="number"
                fullWidth
                onChange={(e) => {
                  let flrNumber = "";
                  if (e.target.value) {
                    flrNumber = parseInt(e.target.value);
                  }
                  let dt = this.state.dataContract;
                  dt.floorNumber = flrNumber;
                  this.setState({ dataContract: dt });
                }}
                value={this.state.dataContract.floorNumber}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <TextField
                label="Daire"
                type="number"
                fullWidth
                onChange={(e) => {
                  let doorn = "";
                  if (e.target.value) {
                    doorn = parseInt(e.target.value);
                  }
                  let dt = this.state.dataContract;
                  dt.doorNumber = doorn;
                  this.setState({ dataContract: dt });
                }}
                //value={this.updateContract.doorNumber}
                value={this.state.dataContract.doorNumber}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MemberDefine);
