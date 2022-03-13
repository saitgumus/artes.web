import React, { Component } from "react";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import User from "../../Models/User";
import Messages from "../../Types/Messages";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cityActions from "../../redux/actions/city-county-actions";
import * as loginActions from "../../redux/actions/login-actions";
import GoogleLoginComponent from "./google/google-login";
import {
  IsNullOrEmpty,
  ShowStatusError,
  ShowStatusSuccess,
} from "../../Core/Helper";
import { Checkbox, FormControlLabel, Grid, Typography } from "@material-ui/core";
import { ForgotPassword } from "../../Services/UserService";

/*
 * Login component (giriş yap)
 * */
class Login extends Component {
  loginUserContract = new User();

  constructor(props) {
    super(props);
    this.state = {
      dataContract: {
        Email: "",
        Password: "",
      },
      validate: {
        emailState: "",
      },
      isForgotPassword: false,
    };
  }

  componentDidMount() {
    this.props.actions.changeLoginStatus({
      token: "",
      expiration: new Date(),
      isSuccess: false,
    });
    //dev ortamı için otomatik login
    // this.props.actions.loginUser({
    //   firstName: "Fatih",
    //   lastName: "Gümüs",
    //   userName: "",
    //   email: "fatihgumus33@gmail.com",
    //   password: "password",
    //   memberId: 0,
    // });
  }

  validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  onForgotPassword = async () => {
    let user = this.state.dataContract;
    if (IsNullOrEmpty(user.Email)) {
      ShowStatusError("mail adresinizi giriniz.");
      return;
    }

    await ForgotPassword(user)
      .then((res) => {
        if (res.success) {
          ShowStatusSuccess(
            "Parola değiştirebilmeniz için doğrulama kodu mail adresinize gönderilmiştir."
          );
          this.setState({
            ...this.state,
            dataContract: {},
            isForgotPassword: false,
            validate: { emailState: "" },
          });
        } else {
          ShowStatusError(res.getResultsStringFormat);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
            <Grid container direction="column"  alignContent="center" justifyContent="stretch" spacing={3}>
                <Grid item>
                  <Typography variant="h3"> Login </Typography>
                </Grid>
                <Grid item>
                  <hr />
                </Grid>
                <Grid item>
                  <Form className="form">
                    <Col>
                      <FormGroup>
                        <Label>{Messages.LabelNames.email}</Label>
                        <Input
                          valid={
                            this.state.validate.emailState === "has-success"
                          }
                          invalid={
                            this.state.validate.emailState === "has-danger"
                          }
                          type="email"
                          name="email"
                          id="userEmail"
                          autoComplete="username"
                          placeholder=""
                          onChange={(e) => {
                            this.loginUserContract.email = e.target.value;
                            var datac = this.state.dataContract;
                            datac.Email = e.target.value;
                            this.setState({ dataContract: datac });
                          }}
                          onBlur={(e) => this.validateEmail(e)}
                        />
                        <FormFeedback valid={true}>
                          {" "}
                          {Messages.EMailValid}
                        </FormFeedback>
                        <FormFeedback invalid="true">
                          {Messages.EMailInvalid}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="userLoginPassword">
                          {Messages.LabelNames.password}
                        </Label>
                        <Input
                          type="password"
                          name="password"
                          id="userLoginPassword"
                          autoComplete="current-password"
                          onChange={(e) => {
                            this.loginUserContract.password = e.target.value;
                          }}
                          disabled={this.state.isForgotPassword}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => {
                                this.setState({
                                  isForgotPassword: e.target.checked,
                                });
                              }}
                              checked={this.state.isForgotPassword}
                              name="forgot"
                            />
                          }
                          label="Parolamı Unuttum"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Button
                          color={"primary"}
                          onClick={(e) => {
                            if (this.state.isForgotPassword)
                              this.onForgotPassword();
                            else {
                              if (
                                IsNullOrEmpty(this.loginUserContract.email) ||
                                IsNullOrEmpty(this.loginUserContract.password)
                              ) {
                                ShowStatusError(
                                  "Email ve parola alanlarını doldurunuz."
                                );
                                return;
                              }
                              this.props.actions.loginUser(
                                this.loginUserContract
                              );
                            }
                          }}
                        >
                          {this.state.isForgotPassword
                            ? "Doğrulama Kodu Al"
                            : Messages.ActionNames.enter}
                        </Button>
                      </FormGroup>
                    </Col>
                  </Form>
                </Grid>
                <Grid item>
                  <hr />
                </Grid>
                <Grid item>
                  <GoogleLoginComponent />
                </Grid>
              </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    userContract: state.loginReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCityList: bindActionCreators(cityActions.getCityList, dispatch),
      loginUser: bindActionCreators(loginActions.Login, dispatch),
      changeLoginStatus: bindActionCreators(
        loginActions.ChangeLoginStatus,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
