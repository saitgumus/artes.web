import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { Component } from "react";
import { GetApartmentListByManagerUserName } from "../../Services/MemberDefineService";

export default class ApartmentComponent extends Component {
  defaultApartment = {
    apartmentId: -1,
    name: "Seçiniz",
  };
  constructor(props) {
    super(props);
    this.state = {
      apartmentList: [this.defaultApartment],
    };
  }

  componentDidMount() {
    this.getAPartmentList();
  }

  getAPartmentList = async () => {
    GetApartmentListByManagerUserName()
      .then((res) => {
        if (res && res.length > 0) {
          this.setState({ apartmentList: res });
        }
      })
      .catch((e) => console.log(e));
  };
  render() {
    return (
      <Autocomplete
        id="combo-box-demo-prm"
        options={this.state.apartmentList}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label={this.props.label ? this.props.label : "Apartman"}
          />
        )}
        onChange={(e, value, reason) => {
          // addressId: 8
          // addressText: null
          // apartmentId: 5
          // apartmentManagerId: 1
          // blockList: null
          // cityId: 0
          // countyId: 0
          // managerUserName: null
          // name: "postmanTest"
          // zipCode: null
          // __proto__: Object
          if (value && this.props.onChange) {
            this.props.onChange(value);
          }
        }}
      />
    );
  }
}
