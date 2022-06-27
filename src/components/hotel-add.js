import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar, Card, CardContent, CardHeader, Grid, TextField} from "@material-ui/core";
import {GetIntValue, IsNullOrEmpty, IsNullOrEmptyAll, ShowStatusError} from "../Core/Helper";
import ComboBox from "./ToolBox/combo-box";
import PropTypes from "prop-types";

function mapStateToProps(state) {
    return {};
}

class HotelAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderCount:0,
            isUpdate:this.props.isUpdate,
            hotel: 
            this.props.hotelModel ?
            this.props.hotelModel :
            {
                validSectors:"1,2,3,4,5,6,7,8,9,10"
            },
            countryList: props.countryList && props.countryList.length > 0 ? props.countryList : [],
            isLoading:true,
            defaultCountry:undefined,
            validation:{
                hotelName:{
                    isValid:true,
                    helperText:""
                },
                hotelCode:{
                    isValid:true,
                    helperText:""
                },
                countryCode:{
                    isValid:true,
                    helperText:""
                },
                hotelAdminName:{
                    isValid:true,
                    helperText:""
                },
                hotelAdminMail:{
                    isValid:true,
                    helperText:""
                },
                validSectors:{
                    isValid:true,
                    helperText:""
                },
                mobileCountryCode:{
                    isValid:true,
                    helperText:""
                },
                mobileNumber:{
                    isValid:true,
                    helperText:""
                },
                address:{
                    isValid:true,
                    helperText:""
                }
            }
        };

    }

    componentDidMount() {
        if(this.state.hotel.countryCode && this.state.countryList.length>0){
            // eslint-disable-next-line no-unused-expressions
            let country = this.state.countryList.filter(val => val.code === this.state.hotel.countryCode);
            if(country){
                this.setState({defaultCountry:country[0]})
            }
        }
    }

    validateAndSetHotel = ()=>{
        this.state.hotel.validSectors = "1,2,3,4,5,6,7,8,9,10";
    if(IsNullOrEmptyAll([this.state.hotel.hotelName,this.state.hotel.hotelAdminName,
        this.state.hotel.hotelAdminMail,this.state.hotel.address,this.state.hotel.mobileNumber,this.state.hotel.validSectors])){
        return;
    }
    if(GetIntValue(this.state.hotel.hotelCode)< 1 ||
        GetIntValue(this.state.hotel.countryCode)< 1 ||
        GetIntValue(this.state.hotel.mobileCountryCode)< 1){
        return;
    }

    if(this.props.setHotel) this.props.setHotel(this.state.hotel)

    }

    render() {
        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            style={{backgroundColor: "#26bdba"}}
                        >
                            "A"
                        </Avatar>
                    }
                    title={"ARTES"}
                    subheader={"NEW HOTEL"}
                />
                <CardContent>
                    <Grid container spacing={3} direction="column" alignItems="stretch">
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth={true}
                                required
                                error={!this.state.validation.hotelName.isValid}
                                helperText={this.state.validation.hotelName.helperText}
                                label="Hotel Name"
                                variant="standard"
                                value={this.state.hotel.hotelName}
                                onChange={(e) => {
                                    let val = this.state.hotel;
                                    val.hotelName = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(IsNullOrEmpty(this.state.hotel.hotelName)){
                                        validObj.hotelName.isValid = false;
                                        validObj.hotelName.helperText = "Geçerli bir otel ismi girmelisiniz.";
                                    }else{
                                        validObj.hotelName.isValid = true
                                        validObj.hotelName.helperText = ""
                                    }
                                        this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.hotelCode.isValid}
                                helperText={this.state.validation.hotelCode.helperText}
                                type={"number"}
                                label="Hotel Code"
                                variant="standard"
                                value={this.state.hotel.hotelCode}
                                onChange={(e) => {
                                    //this.state.hotel.hotelCode = parseInt(e.target.value);
                                    let val = this.state.hotel;
                                    val.hotelCode = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(GetIntValue(this.state.hotel.hotelCode) < 1){
                                        validObj.hotelCode.isValid = false;
                                        validObj.hotelCode.helperText = "Geçerli bir otel kodu girmelisiniz.";
                                    }else{
                                        validObj.hotelCode.isValid = true
                                        validObj.hotelCode.helperText = ""
                                    }
                                        this.setState({validation:validObj})
                                }}
                            />

                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <ComboBox
                                itemSource={this.state.countryList}
                                label="Country"
                                fullWidth={true}
                                defaultValue={this.state.defaultCountry}
                                onSelectedItemChange={ (selectedValue)=>{
                                    //this.state.hotel.countryCode = selectedValue.code
                                    let val = this.state.hotel;
                                    val.countryCode = selectedValue.code;
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.hotelAdminName.isValid}
                                helperText={this.state.validation.hotelAdminName.helperText}
                                label="Admin Name"
                                variant="standard"
                                value={this.state.hotel.hotelAdminName}
                                onChange={(e) => {
                                    //this.state.hotel.hotelAdminName = e.target.value;
                                    let val = this.state.hotel;
                                    val.hotelAdminName = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(IsNullOrEmpty(this.state.hotel.hotelAdminName)){
                                        validObj.hotelAdminName.isValid = false;
                                        validObj.hotelAdminName.helperText = "Geçerli bir isim girmelisiniz.";
                                    }else{
                                        validObj.hotelAdminName.isValid = true
                                        validObj.hotelAdminName.helperText = ""
                                    }
                                        this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.hotelAdminMail.isValid}
                                helperText={this.state.validation.hotelAdminMail.helperText}
                                label="Admin Email"
                                variant="standard"
                                value={this.state.hotel.hotelAdminMail}
                                onChange={(e) => {
                                    //this.state.hotel.hotelAdminMail = e.target.value;
                                    let val = this.state.hotel;
                                    val.hotelAdminMail = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                    const emailRex =
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    var validObj = {...this.state.validation};
                                    if (emailRex.test(this.state.hotel.hotelAdminMail)) {
                                        validObj.hotelAdminMail.isValid = true;
                                        validObj.hotelAdminMail.helperText = "";
                                    }else {
                                        validObj.hotelAdminMail.isValid = false;
                                        validObj.hotelAdminMail.helperText = "Geçerli bir mail adresi girmelisiniz.";
                                    }
                                    this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.mobileCountryCode.isValid}
                                helperText={this.state.validation.mobileCountryCode.helperText}
                                type={"number"}
                                label="Mobile Country Code"
                                variant="standard"
                                value={this.state.hotel.mobileCountryCode}
                                onChange={(e) => {
                                    //this.state.hotel.mobileCountryCode = parseInt(e.target.value);
                                    let val = this.state.hotel;
                                    val.mobileCountryCode = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(GetIntValue(this.state.hotel.mobileCountryCode) < 1){
                                        validObj.mobileCountryCode.isValid = false;
                                        validObj.mobileCountryCode.helperText = "Geçerli bir ülke kodu girmelisiniz.";
                                    }else{
                                        validObj.mobileCountryCode.isValid = true
                                        validObj.mobileCountryCode.helperText = ""
                                    }
                                    this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.mobileNumber.isValid}
                                helperText={this.state.validation.mobileNumber.helperText}
                                label="Mobile Phone Number"
                                variant="standard"
                                value={this.state.hotel.mobileNumber}
                                onChange={(e) => {
                                    //this.state.hotel.mobileNumber = e.target.value;
                                    let val = this.state.hotel;
                                    val.mobileNumber = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(IsNullOrEmpty(this.state.hotel.mobileNumber)){
                                        validObj.mobileNumber.isValid = false;
                                        validObj.mobileNumber.helperText = "Geçerli bir telefon numarası girmelisiniz.";
                                    }else{
                                        validObj.mobileNumber.isValid = true
                                        validObj.mobileNumber.helperText = ""
                                    }
                                    this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.address.isValid}
                                helperText={this.state.validation.address.helperText}
                                label="Adres"
                                variant="standard"
                                value={this.state.hotel.address}
                                onChange={(e) => {
                                    //this.state.hotel.address = e.target.value;
                                    let val = this.state.hotel;
                                    val.address = e.target.value
                                    this.setState({hotel:{...val}});
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(IsNullOrEmpty(this.state.hotel.address)){
                                        validObj.address.isValid = false;
                                        validObj.address.helperText = "Geçerli bir adres girmelisiniz.";
                                    }else{
                                        validObj.address.isValid = true
                                        validObj.address.helperText = ""
                                    }
                                    this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.validSectors.isValid}
                                helperText={this.state.validation.validSectors.helperText}
                                disabled={true}
                                label="Valid Sectors"
                                variant="standard"
                                value={"1,2,3,4,5,6,7,8,9,10"}
                                onChange={(e) => {
                                    this.state.hotel.validSectors = e.target.value;
                                    this.validateAndSetHotel();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(IsNullOrEmpty(this.state.hotel.validSectors)){
                                        validObj.validSectors.isValid = false;
                                        validObj.validSectors.helperText = "Geçerli bir sector girmelisiniz.";
                                    }else{
                                        validObj.validSectors.isValid = true
                                        validObj.validSectors.helperText = ""
                                    }
                                    this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

HotelAdd.defaultProps = {
    countryList: PropTypes.array.isRequired,
    setHotel:PropTypes.func.isRequired,
    isUpdate:PropTypes.bool,
    hotelModel: PropTypes.object
};

export default connect(
    mapStateToProps,
)(HotelAdd);