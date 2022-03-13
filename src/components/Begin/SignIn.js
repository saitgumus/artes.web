import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  FormText,
  Row,
} from "reactstrap";
import User from "../../Models/User";
import Messages from "../../Types/Messages";
import { CommonTypes } from "../../Types/Common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerActions from "../../redux/actions/register-actions";
import * as pageActions from "../../redux/actions/page-actions";
import { AppmanCommon } from "../Common/Constants";
import {
  Card,
  Grid,
  Paper,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Switch,
} from "@material-ui/core";
import {
  GetIntValue,
  IsNullOrEmpty,
  ShowStatusError,
  ShowStatusSuccess,
} from "../../Core/Helper";
import { ParameterService } from "../../Services/CoreService";
import { Company } from "../../Models/Company";
import { RegisterCompany } from "../../Services/UserService";
import CityComponent from "../Common/city-component";
import CountyComponent from "../Common/county-component";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailState: "",
      dataContract: new User(),
      validate: {
        emailState: "",
      },
      hasAlert: false,
      messageType: CommonTypes.MessageTypes.info,
      alertMessage: "",
      selectedPackage: {},
      packageList: [],
      isCompany: false,
      companyContract: new Company(),
      selectedCityId: 0,
    };
  }

  componentDidMount() {
    this.getSubscriptionPackages();
  }

  //#region metods

  getSubscriptionPackages = async () => {
    let param = new ParameterService();
    param
      .GetParameter("Subscription")
      .then((response) => {
        if (!response.success) {
          ShowStatusError(response.getResultsStringFormat());
          return;
        }
        if (response.valueList && response.valueList.length > 0) {
          //paramValue=paket adı
          //paramValue2=geçerliik sresi(ay)
          //paramValue3=apartman limit
          //paramValue4=üye limit
          let packageList = [];
          for (const item of response.valueList) {
            var pac = {};
            pac.packageName = item.paramValue;
            pac.period = GetIntValue(item.paramValue2);
            pac.apartmentLimit = GetIntValue(item.paramValue3);
            pac.memberLimit = GetIntValue(item.paramValue4);
            packageList.push(pac);
          }
          this.setState({ packageList: packageList });
        }
      })
      .catch((err) => {
        ShowStatusError(err.toOString());
      });
  };

  submitForm() {
    if (!this.validateContract) {
      ShowStatusError("Zorunlu alanları doldurunuz.");
      return false;
    }
    if (this.state.isCompany) {
      RegisterCompany(this.state.companyContract)
        .then((res) => {
          if (res.success) {
            ShowStatusSuccess("Kullanıcı oluşturuldu.");
          } else {
            ShowStatusError(res.getResultsStringFormat());
          }
        })
        .catch((err) => {
          ShowStatusError("İşlem yapılamadı.");
        });
    } else {
      if (
        this.validateContract(this.state.dataContract) &&
        this.props.actions.register
      ) {
        this.props.actions.changeBackdropStatus(true);
        this.props.actions.register(this.state.dataContract);
      }
    }
  }

  //#region validating
  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({ validate });
  }

  /**
   * validating user values
   * @param {User} contract
   */
  validateContract(contract) {
    let company = this.state.companyContract;
    if (this.state.isCompany) {
      if (IsNullOrEmpty(company.companyName)) return false;
      if (IsNullOrEmpty(company.taxNumber)) return false;
      if (IsNullOrEmpty(company.email)) return false;
      if (IsNullOrEmpty(company.password)) return false;
      return true;
    }
    if (contract.FirstName && contract.FirstName.length < 1) {
      return false;
    }
    if (contract.LastName && contract.LastName.length < 1) {
      return false;
    }
    if (contract.Email && contract.Email.length < 1) {
      return false;
    }
    if (contract.Password && contract.Password.length < 1) {
      return false;
    }
    return true;
  }

  //#endregion

  //#endregion

  /**
   *
   * @param {CityContract} city
   */
  onSelectedCity = (city) => {
    if (city) {
      var cmp = this.state.companyContract;
      cmp.cityId = city.cityId;
      this.setState({ selectedCityId: city.cityId, companyContract: cmp });
    }
  };
  onSelectedCounty = (county) => {
    if (county) {
      var cmp = this.state.companyContract;
      cmp.countyId = county.countyId;
      this.setState({ companyContract: cmp });
    }
  };
  render() {
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={5}>
            <Grid container spacing={3} style={{ margin: "30px" }}>
              <Grid item xs={12}>
                <Grid
                  container
                  justify={"flex-start"}
                  aria-orientation={"horizontal"}
                  spacing={3}
                >
                  {this.state.packageList.length > 0 ? (
                    this.state.packageList.map((val, ind) => {
                      return (
                        <Grid item key={"sgngrid" + ind.toString()}>
                          <Paper elevation={1}>
                            <Card>
                              <CardActionArea>
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h5"
                                  >
                                    {val.packageName}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                  >
                                    {val.period} ay geçerli
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                  >
                                    {val.apartmentLimit} adet apartman kaydı
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                  >
                                    {val.memberLimit} adet üye kaydı
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions>
                                <Button
                                  size="small"
                                  color={
                                    this.state.selectedPackage.packageName ===
                                    val.packageName
                                      ? "success"
                                      : "primary"
                                  }
                                  onClick={(e) => {
                                    ShowStatusSuccess(
                                      "Seçilen paket : " + val.packageName
                                    );
                                    this.setState({ selectedPackage: val });
                                  }}
                                  disabled={false}
                                >
                                  {this.state.selectedPackage.packageName ===
                                  val.packageName
                                    ? "Paket Seçildi"
                                    : "Paketi Seç"}
                                </Button>
                              </CardActions>
                            </Card>
                          </Paper>
                        </Grid>
                      );
                    })
                  ) : (
                    <p />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Container className="App">
              <Form className="form">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>
                        {this.state.isCompany ? "Kurumsal" : "Bireysel"}
                      </Label>
                      <Switch
                        checked={this.state.isCompany}
                        onChange={(e) =>
                          this.setState({ isCompany: e.target.checked })
                        }
                        color="primary"
                        name="Kurumsal"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.isCompany ? (
                  <React.Fragment>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Kurum Adı</Label>
                          <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            onChange={(e) => {
                              var cmp = { ...this.state.companyContract };
                              cmp.companyName = e.target.value;
                              this.setState({ companyContract: cmp });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Vergi Numarası</Label>
                          <Input
                            type="text"
                            name="taxNumber"
                            id="taxNumber"
                            onChange={(e) => {
                              var cmp = { ...this.state.companyContract };
                              cmp.taxNumber = e.target.value;
                              this.setState({ companyContract: cmp });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>İl</Label>
                          <CityComponent onSelectedCity={this.onSelectedCity} />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>İlçe</Label>
                          <CountyComponent
                            onSelectedCounty={this.onSelectedCounty}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>Adres</Label>
                          <Input
                            type="textarea"
                            name="address"
                            id="address"
                            onChange={(e) => {
                              var cmp = { ...this.state.companyContract };
                              cmp.addressText = e.target.value;
                              this.setState({ companyContract: cmp });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>{Messages.LabelNames.name}</Label>
                        <Input
                          type="text"
                          name="firstname"
                          id="userFirstName"
                          onChange={(e) => {
                            // eslint-disable-next-line
                            this.state.dataContract.firstName = e.target.value;
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>{Messages.LabelNames.surname}</Label>
                        <Input
                          type="text"
                          name="lastName"
                          id="userLastName"
                          onChange={(e) => {
                            var contract = this.state.dataContract;
                            contract.lastName = e.target.value;
                            this.setState({ dataContract: contract });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="userSignEmail">
                        {Messages.LabelNames.email}
                      </Label>
                      <Input
                        valid={this.state.validate.emailState === "has-success"}
                        invalid={
                          this.state.validate.emailState === "has-danger"
                        }
                        type="email"
                        name="email"
                        id="userSignEmail"
                        placeholder=""
                        onChange={(e) => {
                          var contract = this.state.dataContract;
                          var cmp = this.state.companyContract;
                          contract.email = e.target.value;
                          cmp.email = e.target.value;
                          this.setState({
                            dataContract: contract,
                            companyContract: cmp,
                          });
                        }}
                        onBlur={(e) => this.validateEmail(e)}
                      />
                      <FormFeedback valid={true}>
                        {" "}
                        {Messages.EMailValid}
                      </FormFeedback>
                      <FormFeedback invalid={"true"}>
                        {Messages.EMailInvalid}
                      </FormFeedback>
                      <FormText> {Messages.EMailInputFormText}</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="userPassword">
                        {Messages.LabelNames.password}
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        id="userPassword"
                        placeholder=""
                        onChange={(e) => {
                          var cmp = { ...this.state.companyContract };
                          var dtc = this.state.dataContract;
                          dtc.password = e.target.value;
                          cmp.password = e.target.value;
                          this.setState({
                            companyContract: cmp,
                            dataContract: dtc,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>{"Telefon Numarası"}</Label>
                      <Input
                        type="tel"
                        name="Phone"
                        id="phone"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={(e) => {
                          var cmp = { ...this.state.companyContract };
                          var dtc = this.state.dataContract;
                          dtc.phoneNumber = e.target.value;
                          cmp.phoneNumber = e.target.value;
                          this.setState({
                            companyContract: cmp,
                            dataContract: dtc,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  color={"primary"}
                  onClick={(e) => {
                    AppmanCommon.isBackDrop = !AppmanCommon.isBackDrop;
                    this.submitForm();
                  }}
                >
                  {"Kayıt Ol"}
                </Button>
              </Form>
            </Container>
          </Grid>
          <Grid item xs={7}>
            {this.state.isCompany ? (
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Typography variant="h3">Kurumsal Hesap Açılışı</Typography>
                </Grid>
                <Grid>
                  <img
                    src={require("../../resources/images/company-concept-illustration_114360-2581.jpg")}
                    alt="company"
                  ></img>
                </Grid>
                <Grid>
                  <Typography>
                    Kurumsal hesap ile ihalelere teklif verebilirsiniz.
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <div>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h3">Bireysel Hesap Açılışı</Typography>
                  </Grid>
                  <Grid>
                    <img
                      src={require("../../resources/images/individual.jpg")}
                      alt="company"
                    ></img>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" paragraph>
                      Bireysel hesap açarak apartman yönetimini hızlı, kolay ve
                      verimli bir şekilde yapabilirsiniz.
                    </Typography>
                    <Typography paragraph>
                      APMAN uygulaması ile apartman yönetimi bambaşka bir hale
                      gelir. İstediğiniz yerden, istediğiniz zaman apartman
                      sakinleri ile anketler düzenleyebilir, herhangi bir iş
                      için firmalardan teklif alabilir, ve apartman gelir -
                      gider takibini yapabilirsiniz.
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

//#region redux

function mapStateToProps(state) {
  return {
    // registeredUser: state.registerReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeBackdropStatus: bindActionCreators(
        pageActions.changeBackDropStatus,
        dispatch
      ),
      register: bindActionCreators(registerActions.registerUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

//#endregion
