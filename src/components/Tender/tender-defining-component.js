import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { CommonTypes, getDateIsoDate } from "../../Types/Common";
import * as pageActions from "../../redux/actions/page-actions";
import { connect } from "react-redux";
import {
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import ApartmentComponent from "../Common/apartment-component";
import DateTimeComponent from "../ToolBox/datetime-component";
import {
  GetIntValue,
  IsNullOrEmptyAll,
  ShowStatusError,
  ShowStatusSuccess,
} from "../../Core/Helper";
import { TenderContract } from "../../Models/TenderContract";
import { SaveTender } from "../../Services/TenderService";

/**
 * ihale tanımıı
 */
class TenderDefining extends Component {
  state = {
    datacontract: new TenderContract(),
    isOpenDialogForm: false,
    agreementContract: {
      subject: "",
      description: "",
      title: "",
      content: "",
    },
  };

  componentDidMount() {
    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.TenderDefining.resourceCode
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
        //#region control
        let emptyControl = IsNullOrEmptyAll([
          this.state.datacontract.name,
          this.state.datacontract.description,
          this.state.agreementContract.subject,
          this.state.agreementContract.title,
          this.state.agreementContract.content,
        ]);
        if (!emptyControl) {
          ShowStatusError("zorunlu alanları doldurunuz.");
          return;
        }
        if (GetIntValue(this.state.datacontract.apartmentId) < 1) {
          ShowStatusError("Apartman seçiniz.");
          return;
        }
        if (
          !this.state.datacontract.beginDate ||
          !this.state.datacontract.endDate
        ) {
          ShowStatusError("ihale başlangıç ve bitiş tarihi zorunludur.");
          return;
        }
        if (this.state.datacontract.endDate < getDateIsoDate()) {
          ShowStatusError("ihale bitiş tarihi bugünden önce olmamalıdır.");
          return;
        }
        if (this.state.datacontract.beginDate < getDateIsoDate()) {
          ShowStatusError("ihale başlangıç tarihi bugünden önce olmamalıdır.");
          return;
        }
        if (this.state.datacontract.firstAmount < 1) {
          ShowStatusError("Açılış tutarı giriniz.");
          return;
        }

        //#endregion
        let contract = new TenderContract();
        contract = { ...this.state.datacontract };
        contract.agreement = { ...this.state.agreementContract };

        await SaveTender(contract)
          .then((response) => {
            if (response && response.success) {
              ShowStatusSuccess("İhale işlemi başarılı.");
            } else {
              ShowStatusError("Kayıt işlemi başarısız.");
            }
          })
          .catch((err) => {
            ShowStatusError("Kayıt işlemi başarısız.");
          });

        break;
      default:
        break;
    }
  };

  handleCloseDialog = () => {
    this.setState({ isOpenDialogForm: false });
  };

  render() {
    return (
      <div>
        <Grid container direction="column" spacing={5}>
          <Grid item xs={6}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <ApartmentComponent
                  onChange={(value) => {
                    let cont = this.state.datacontract;
                    cont.apartmentId = value.apartmentId;
                    this.setState({ datacontract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="İhale Adı"
                  value={this.state.datacontract.name}
                  onChange={(e) => {
                    var cont = { ...this.state.datacontract };
                    cont.name = e.target.value;
                    this.setState({ datacontract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Açıklama"
                  value={this.state.datacontract.description}
                  onChange={(e) => {
                    var cont = { ...this.state.datacontract };
                    cont.description = e.target.value;
                    this.setState({ datacontract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <DateTimeComponent
                  label="Başlangıç Tarihi"
                  onChangeDate={(date) => {
                    var cont = { ...this.state.datacontract };
                    cont.beginDate = date;
                    this.setState({ datacontract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <DateTimeComponent
                  label="Bitiş Tarihi"
                  onChangeDate={(date) => {
                    var cont = { ...this.state.datacontract };
                    cont.endDate = date;
                    this.setState({ datacontract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Açılış Değeri"
                  type="number"
                  step="0.25"
                  onChange={(e) => {
                    var cont = { ...this.state.datacontract };
                    cont.firstAmount = parseFloat(e.target.value);
                    this.setState({ datacontract: cont });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={3} direction={"column"}>
              <Grid item>
                <Typography variant={"h4"}>Sözleşme Bilgileri</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Sözleşme Konusu"
                  value={this.state.agreementContract.subject}
                  onChange={(e) => {
                    let cont = this.state.agreementContract;
                    cont.subject = e.target.value;
                    this.setState({ agreementContract: cont });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Açıklama"
                  value={this.state.agreementContract.description}
                  onChange={(e) => {
                    let cont = this.state.agreementContract;
                    cont.description = e.target.value;
                    this.setState({ agreementContract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Sözleşme Başlığı"
                  value={this.state.agreementContract.title}
                  onChange={(e) => {
                    let cont = this.state.agreementContract;
                    cont.title = e.target.value;
                    this.setState({ agreementContract: cont });
                  }}
                />
              </Grid>
              <Grid item>
                <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={5}
                  style={{ width: "500px" }}
                  placeholder="Sözleşme metni"
                  value={this.state.agreementContract.content}
                  onChange={(e) => {
                    let cont = this.state.agreementContract;
                    cont.content = e.target.value;
                    this.setState({ agreementContract: cont });
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

//#region redux

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
export default connect(mapStateToProps, mapDispatchToProps)(TenderDefining);

//#endregion
