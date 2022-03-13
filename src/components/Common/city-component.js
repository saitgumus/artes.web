import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cityCountyActions from "../../redux/actions/city-county-actions";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class CityComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    this.props.actions.getCityList();
  }

  render() {
    return (
      <div>
        <Autocomplete
          id="combo-box-demo-city"
          options={
            this.props.cityList && this.props.cityList.length > 1
              ? this.props.cityList
              : [{ name: "" }]
          }
          getOptionLabel={(option) => option.name}
          fullWidth={true}
          renderInput={(params) => (
            <TextField
              {...params}
              label="İl"
              variant="outlined"
              fullWidth={true}
            />
          )}
          onChange={(e, value, reason) => {
            //value : cityContract
            if (value && value.cityId) {
              this.props.actions.changeSelectedCityId(value.cityId);
              if (this.props.onSelectedCity) {
                this.props.onSelectedCity(value);
              }
            }
          }}
        />
      </div>
    );
  }
}

CityComponent.propTypes = {
  onSelectedCity: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cityList: state.cityReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCityList: bindActionCreators(cityCountyActions.getCityList, dispatch),
      changeSelectedCityId: bindActionCreators(
        cityCountyActions.changeSelectedCityId,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CityComponent);
