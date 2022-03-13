import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { ParameterService } from "../../Services/CoreService";

export default class ParameterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          paramType: "default",
          paramDescription: "loading...",
        },
      ],
      paramType: this.props.paramType,
      labelName: this.props.labelName ? this.props.labelName : "parameter name",
      isAllOption: this.props.isAllOption,
      selectedParamCode: -1,
    };
  }

  service = new ParameterService();

  onChange = this.props.onSelectParameter;

  componentDidMount() {
    this.service.GetParameter(this.state.paramType).then((value) => {
      this.setState(Object.assign({}, this.state, { data: value.valueList }));
    });
  }

  render() {
    return (
      <div>
        <Autocomplete
          id="combo-box-demo-prm"
          options={this.state.data}
          getOptionLabel={(option) => option.paramDescription}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={this.state.labelName}
              variant="outlined"
            />
          )}
          onChange={(e, value, reason) => {
            if (value && this.props.onSelectParameter) {
              this.props.onSelectParameter(value.paramCode);
            }
          }}
        />
      </div>
    );
  }
}
