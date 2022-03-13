import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
import SaveIcon from "@material-ui/icons/Save";
import {
  IsNullOrEmpty,
  ShowStatusError,
  ShowStatusSuccess,
} from "../../Core/Helper";
import { connect } from "react-redux";
import * as loginActions from "../../redux/actions/login-actions";
import { bindActionCreators } from "redux";
import { SetNewPassword } from "../../Services/UserService";
import Cache from "../../Services/Cache";

/**
 * password change component
 */
class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: Cache.getItem("lastloginrequestuser"),
      newPassword: "",
      newPassword2: "",
    };
  }

  onSubmitForm = async () => {
    if (IsNullOrEmpty(this.state.user.email)) {
      ShowStatusError("mail adresi alınamadı.");
      return;
    }
    if (this.state.newPassword.length < 8) {
      ShowStatusError("şifreniz en az 8 karakter olmalıdır.");
      return;
    }
    if (IsNullOrEmpty(this.state.newPassword)) {
      ShowStatusError("yeni şifrenizi giriniz.");
      return;
    }
    if (this.state.newPassword.trim() !== this.state.newPassword2.trim()) {
      ShowStatusError(
        "girdiğiniz parola ve tekrarı bir biri ile eşleşmemektedir."
      );
      return;
    }

    /**yeni parola kaydı */
    await SetNewPassword(this.state.newPassword, this.state.user.email)
      .then((response) => {
        if (response && !response.success) {
          ShowStatusError(response.getResultsStringFormat());
        } else {
          ShowStatusSuccess(
            "şifreniz kaydedildi. yeniden giriş yapabilirsiniz."
          );
          this.changeStatus();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeStatus = () => {
    this.props.actions.changeLoginStatus({
      token: "",
      expiration: new Date(),
      isSuccess: false,
    });
  };
  render() {
    return (
      <Grid container spacing={3} direction={"row"}>
        <Grid item>
          <Typography>{this.state.user.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Yeni şifre"}
            required
            value={this.state.newPassword}
            onChange={(e) => {
              this.setState({ ...this.state, newPassword: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Yeni şifre tekrar"}
            required
            value={this.state.newPassword2}
            onChange={(e) => {
              this.setState({ ...this.state, newPassword2: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={(e) => {
              this.onSubmitForm();
            }}
          >
            Kaydet
          </Button>
        </Grid>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeLoginStatus: bindActionCreators(
        loginActions.ChangeLoginStatus,
        dispatch
      ),
    },
  };
}
function mapStateToProps(state) {
  return {
    loginJwtObject: state.changeLoginStatusReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
