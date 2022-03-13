import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, TextField, Typography } from "@material-ui/core";
import { DuesContract } from "../../Models/DuesContract";
import {
  GetActiveLocalUser,
  ShowStatusError,
  ShowStatusSuccess,
} from "../../Core/Helper";
import DivitComponent from "../Common/divit-component";
import { CommonTypes } from "../../Types/Common";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import { SendDuesPayment } from "../../Services/Accounting";

/**
 * aidat ödeme ekranı
 */
export class DuesPayment extends Component {
  static propTypes = {
    prop: PropTypes.any,
  };

  constructor(props) {
    super(props);
    let initialContract = new DuesContract();
    initialContract.apartmentName = "";

    this.state = {
      selectedFile: "",
      dataContract: initialContract,
      apartmentDues: 0,
      divitContract: {},
      isOpenDivit: false,
    };
  }

  componentDidMount() {
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.DuesPayment.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }

    let user = GetActiveLocalUser();

    if (user.apartment) {
      let contract = { ...this.state.dataContract };
      contract.apartmentId = user.apartment.apartmentId;
      contract.apartmentName = user.apartment.name;
      this.setState({
        dataContract: contract,
        apartmentDues: user.apartment.duesAmount,
      });
    }
  }

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.Divit:
        this.setState({ isOpenDivit: true });
        break;

      case CommonTypes.ActionKeys.Save:
        if (
          !this.state.divitContract.size ||
          this.state.divitContract.size < 1
        ) {
          ShowStatusError("Döküman ekleyiniz.");
          return;
        }

        let duesContract = new DuesContract();
        duesContract = { ...this.state.dataContract };
        duesContract.divitContract = { ...this.state.divitContract };

        SendDuesPayment(duesContract)
          .then((res) => {
            if (res.success) {
              ShowStatusSuccess("Aidat ödemeniz onaya gönderilmiştir.");
              return;
            } else {
              ShowStatusError(res.getResultsStringFormat());
            }
          })
          .catch((err) => {
            ShowStatusError("İşlem gerçekleştirilemedi.");
          });

        break;
      default:
        break;
    }
  };

  /**
   * divit on load
   * @param {DivitContract} contract
   */
  onLoadFile = (contract) => {
    if (!contract) {
      this.setState({ divitContract: {} });
      return;
    }

    this.setState({ divitContract: contract });
  };

  render() {
    return (
      <Grid container spacing={3} direction="column">
        <Grid item>
          <TextField
            label="Apartman adı"
            value={
              this.state.dataContract && this.state.dataContract.apartmentName
            }
            onChange={(e) => {
              this.setState({
                dataContract: {
                  ...this.state.dataContract,
                  apartmentName: e.target.value,
                },
              });
            }}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="Aidat Tutarı"
            type="number"
            value={this.state.apartmentDues}
            onChange={(e) => {
              this.setState({
                apartmentDues: e.target.value,
              });
            }}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item>
          {this.state.isOpenDivit && (
            <DivitComponent onLoadFile={this.onLoadFile} />
          )}
        </Grid>
        <Grid item>
          {this.state.divitContract.name && (
            <React.Fragment>
              <Typography>Dosya:</Typography>
              <Typography>
                Ad:{this.state.divitContract.name} <br />
                Boyut:{this.state.divitContract.size} <br />
                Path:{this.state.divitContract.path}
              </Typography>
            </React.Fragment>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DuesPayment);
