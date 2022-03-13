import React, { Component } from "react";
import { Collapse } from "reactstrap";
import Messages from "../../../Types/Messages";
import ApartmentContract from "../../../Models/ApartmentContract";
import ParameterComponent from "../../Common/parameter-component";
import { CommonTypes } from "../../../Types/Common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cityCountyActions from "../../../redux/actions/city-county-actions";
import * as pageActions from "../../../redux/actions/page-actions";
import CityComponent from "../../Common/city-component";
import CountyComponent from "../../Common/county-component";
import {
  TextField,
  Grid,
  Card,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";

import { DefineSiteApartmentService } from "../../../Services/DefineSiteApartment";
import BlockDefinition from "../../ToolBox/popup-block-definition";
import {
  IsNullOrEmpty,
  ShowStatusError,
  ShowStatusSuccess,
  ShowStatusWarning,
  StringBuilder,
} from "../../../Core/Helper";

/**
 * yeni apartman kaydı yapar
 */
class DefineSiteApartment extends Component {
  dataContract = new ApartmentContract();

  constructor(props) {
    super(props);
    this.state = {
      //site / apartman
      dataContract: new ApartmentContract(),
      selectedCityId: 1,
      loading: true,
      selectedParamCode: -1,
      blocks: [],
    };

    this.renderForParameter = this.renderForParameter.bind(this);
  }

  componentDidMount() {
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.defineSiteApartment.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
  }

  onExecute = (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.Save:
        if (this.controlDataContract())
          this.dataContract.apartmentType = this.state.selectedParamCode;

        DefineSiteApartmentService(this.dataContract)
          .then((res) => {
            if (res.success) {
              ShowStatusSuccess("Apartman kaydedildi.");
            } else {
              let messagebuilder = new StringBuilder();
              messagebuilder.append("Apartman kaydedilirken hata oluştu.");
              messagebuilder.appendLine(res.getResultsStringFormat());
              ShowStatusError(messagebuilder.toString());
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        break;
    }
  };

  /**
   * render for site or apartment parameter
   */
  renderForParameter = () => {
    if (parseInt(this.state.selectedParamCode) > 0) {
      if (this.state.selectedParamCode === "1") {
        //site
        return (
          <Collapse isOpen={this.state.selectedParamCode === "1"}>
            {this.siteDefinitionCard}
          </Collapse>
        );
      } else {
        //apartman
        return (
          <Collapse isOpen={this.state.selectedParamCode === "2"}>
            {this.apartmentDefinitionCard}
          </Collapse>
        );
      }
    } else {
      return <div />;
    }
  };

  /**
   * kaydedilen blokları forma ekler
   */
  getBlockList = () => {
    if (this.props.addedBlocks && this.props.addedBlocks.length > 0) {
      this.dataContract.blockList = this.props.addedBlocks;
      let lst = this.props.addedBlocks.map((elm, ind) => {
        return <ListItem key={ind}> {elm.Code}</ListItem>;
      });
      return lst;
    }
  };
  /**
   * apartman tanıtım kartı
   */
  apartmentDefinitionCard = (
    <Card>
      <Paper>
        <TextField
          fullWidth
          type="string"
          label="Apartman Adı"
          onChange={(e) => {
            this.dataContract.name = e.target.value;
          }}
        />
      </Paper>
    </Card>
  );
  /**
   * site tanıtım kartı
   */
  siteDefinitionCard = (
    <Card>
      <Paper>
        <TextField
          fullWidth
          type="string"
          label="Site Adı"
          onChange={(e) => {
            this.dataContract.name = e.target.value;
          }}
        />
        <BlockDefinition />
      </Paper>
    </Card>
  );

  /**
   * control for data contract validation
   */
  controlDataContract() {
    if (IsNullOrEmpty(this.dataContract.name)) {
      ShowStatusWarning("Apartman veya Site ismini giriniz.");
      return false;
    }
    if (IsNullOrEmpty(this.dataContract.addressText)) {
      ShowStatusWarning("Adres alanı boş olamamalıdır.");
      return false;
    }
    if (this.dataContract.cityId < 1) {
      ShowStatusWarning("İl bilgisi giriniz.");
      return false;
    }
    if (this.dataContract.countyId < 1) {
      ShowStatusWarning("İlçe bilgisi giriniz.");
      return false;
    }
    if (this.dataContract.zipCode < 1) {
      ShowStatusWarning("Posta Kodu bilgisi giriniz.");
      return false;
    }
    if (this.state.selectedParamCode < 1) {
      ShowStatusWarning("Apartman tipi seçiniz.");
      return false;
    }
    return true;
  }

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <ParameterComponent
            paramType="siteapt"
            labelName={Messages.LabelNames.recordType}
            isAllOption={true}
            onSelectParameter={(val) => {
              if (val > 0) {
                this.setState(
                  Object.assign({}, this.state, {
                    selectedParamCode: val,
                  })
                );
              }
            }}
          />
          {this.renderForParameter()}
          <List>{this.getBlockList()}</List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CityComponent
            onSelectedCity={(cityContract) => {
              this.dataContract.cityId = cityContract.cityId;
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CountyComponent
            onSelectedCounty={(contract) => {
              this.dataContract.countyId = contract.countyId;
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label={Messages.LabelNames.zipcode}
            variant="outlined"
            type="number"
            onChange={(e) => {
              this.dataContract.zipCode = e.target.value;
            }}
          />
        </Grid>
        <Grid item xl={6}>
          <TextField
            fullWidth={true}
            id="outlined-basic"
            label={Messages.LabelNames.address}
            multiline
            rows={5}
            variant="outlined"
            onChange={(e) => {
              this.dataContract.addressText = e.target.value;
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

//#region  redux metods

function mapStateToProps(state) {
  return {
    blockList: state.defineBlockReducer,
    actionEvent: state.actionExecuteReducer,
    addedBlocks: state.defineBlockReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCityList: bindActionCreators(cityCountyActions.getCityList, dispatch),
      getCountyList: bindActionCreators(
        cityCountyActions.getCountyListAll,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefineSiteApartment);

//#endregion
