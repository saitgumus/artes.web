import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar, Card, CardContent, CardHeader, Grid, TextField} from "@material-ui/core";
import { IsNullOrEmptyAll} from "../Core/Helper";
import ComboBox from "./ToolBox/combo-box";
import PropTypes from "prop-types";

function mapStateToProps(state) {
    return {};
}

class DeviceAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderCount:0,
            isUpdate:this.props.isUpdate,
            hotelList: this.props.hotelList,
            defaultHotel:{
                value:0,
                name:"Seçiniz"
            },
            device:
                this.props.deviceModel ?
                    this.props.deviceModel :
                    {},
            isLoading:true,
            validation:{
                deviceTypeCd:{
                    isValid:true,
                    helperText:""
                },
                uniqueCode:{
                    isValid:true,
                    helperText:""
                },
                hotelId:{
                    isValid:true,
                    helperText:""
                }
            }
        };

    }

    componentDidMount() {
        if(this.state.device.hotelId && this.state.hotelList.length>0){
            // eslint-disable-next-line no-unused-expressions
            let hotel = this.state.hotelList.filter(val => val.hotelId === this.state.device.hotelId);
            if(hotel){
                this.setState({defaultCountry:hotel[0]})
            }
        }
    }

    validateAndSetDevice = ()=>{

        if(IsNullOrEmptyAll([this.state.device.uniqueCode, this.state.device.deviceTypeCd])){
            return;
        }
        if(!this.state.device.hotelId || this.state.device.hotelId < 1){
            return;
        }

        if(this.props.setDevice) this.props.setDevice(this.state.device)
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
                            "D"
                        </Avatar>
                    }
                    title={"ARTES"}
                    subheader={"NEW DEVICE"}
                />
                <CardContent>
                    <Grid container spacing={5} direction="column" alignItems="stretch">
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.uniqueCode.isValid}
                                helperText={this.state.validation.uniqueCode.helperText}
                                type={"text"}
                                label="Unique Code"
                                variant="standard"
                                value={this.state.device.uniqueCode}
                                onChange={(e) => {
                                    //this.state.hotel.hotelCode = parseInt(e.target.value);
                                    let val = this.state.device;
                                    val.uniqueCode = e.target.value
                                    this.setState({device:{...val}});
                                    this.validateAndSetDevice();
                                }}
                            />

                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <ComboBox
                                itemSource={[
                                    {
                                        name:"LOCK"
                                    },{
                                    name:"CARD"
                                    },
                                    {
                                        name:"GATEWAY"
                                    }]}
                                label="Type"
                                fullWidth={true}
                                defaultValue={{name:"LOCK"}}
                                onSelectedItemChange={ (selectedValue)=>{
                                    //this.state.hotel.countryCode = selectedValue.code
                                    let val = this.state.device;
                                    val.deviceTypeCd = selectedValue.name;
                                    this.setState({device:{...val}});
                                    this.validateAndSetDevice();
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                            <ComboBox
                                itemSource={this.state.hotelList}
                                label="Hotel"
                                fullWidth={true}
                                defaultValue={this.state.defaultHotel}
                                onSelectedItemChange={ (selectedValue)=>{
                                    let val = this.state.device;
                                    val.hotelId = selectedValue.value;
                                    this.setState({device:{...val}});
                                    this.validateAndSetDevice()
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

DeviceAdd.defaultProps = {
    hotelList: PropTypes.array.isRequired,
    setDevice:PropTypes.func.isRequired,
    isUpdate:PropTypes.bool,
};

export default connect(
    mapStateToProps,
)(DeviceAdd);