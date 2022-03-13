import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cityCountyActions from "../../redux/actions/city-county-actions";
import Messages from "../../Types/Messages";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class CountyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.actions.getCountyList();
  }

  createContent(countyList, cityId) {
    let filtered = countyList.filter((x) => x.cityId === parseInt(cityId));
    if (!filtered || filtered.length < 1) {
      return (
        <React.Fragment>
          <Autocomplete
            fullWidth={true}
            id="combo-box-demo-county"
            options={[{ name: "test", id: 1 }]}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label={Messages.LabelNames.county}
                variant="outlined"
              />
            )}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Autocomplete
          id="combo-box-demo-county"
          options={filtered}
          getOptionLabel={(option) => option.name}
          fullWidth={true}
          renderInput={(params) => (
            <TextField
              {...params}
              label={Messages.LabelNames.county}
              variant="outlined"
              fullWidth={true}
            />
          )}
          onChange={(e, value, reason) => {
            //value : countyContract
            if (this.props && this.props.onSelectedCounty) {
              if (value && value.countyId) {
                this.props.onSelectedCounty(value);
              }
            }
          }}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.props.countyList && this.props.countyList.length > 1
          ? this.createContent(this.props.countyList, this.props.currentCityId)
          : this.createContent([], -1)}
      </div>
    );
  }
}

CountyComponent.propTypes = {
  onSelectedCounty: PropTypes.func,
};

//#region redux

function mapStateToProps(state) {
  return {
    countyList: state.countyReducer,
    currentCityId: state.changeSelectedCityReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCountyList: bindActionCreators(
        cityCountyActions.getCountyListAll,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CountyComponent);
//#endregion
