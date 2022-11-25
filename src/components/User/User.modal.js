import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, TextField} from "@material-ui/core";
import PropTypes from "prop-types";
import {AccountCircleRounded} from '@material-ui/icons';
import { IsNullOrEmpty } from '../../Core/Helper';

function mapStateToProps(state) {
    return {};
}

class UserAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderCount:0,
            isUpdate:this.props.isUpdate,
            user: this.props.userModel ?? {},
            isLoading:true,
            validation:{
                fullName:{
                    isValid:true,
                    helperText:""
                },
                email:{
                    isValid:true,
                    helperText:""
                },
            }
        };

    }

    validateAndSetUser = ()=>{
    if(IsNullOrEmpty([this.state.user.fullName,this.state.user.email])){
        return;
    }

    if(this.props.setUser) this.props.setUser(this.state.user)
    }

    render() {
        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            style={{backgroundColor: "#28509C"}}
                        >
                            <AccountCircleRounded/>
                        </Avatar>
                    }
                    title={"ARTES"}
                    subheader={"Create new user"}
                />
                <CardContent>
                    <Grid container spacing={3} direction="column" alignItems="stretch">
                        <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth={true}
                                required
                                error={!this.state.validation.fullName.isValid}
                                helperText={this.state.validation.fullName.helperText}
                                label="Ad Soyad"
                                variant="standard"
                                value={this.state.user.fullName}
                                onChange={(e) => {
                                    let val = this.state.user;
                                    val.fullName = e.target.value
                                    this.setState({user:{...val}});
                                    this.validateAndSetUser();
                                }}
                                onBlur={()=>{
                                        var validObj = {...this.state.validation};
                                    if(IsNullOrEmpty(this.state.user.fullName) || this.state.user.fullName?.length < 3 ){
                                        validObj.fullName.isValid = false;
                                        validObj.fullName.helperText = "Geçerli bir isim girmelisiniz.";
                                    }else{
                                        validObj.fullName.isValid = true
                                        validObj.fullName.helperText = ""
                                    }
                                        this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                            <Grid item md={this.dialogGridMdSize}>
                            <TextField
                                fullWidth
                                required
                                error={!this.state.validation.email.isValid}
                                helperText={this.state.validation.email.helperText}
                                label="Email"
                                variant="standard"
                                value={this.state.user.email}
                                onChange={(e) => {
                                    //this.state.hotel.hotelAdminMail = e.target.value;
                                    let val = this.state.user;
                                    val.email = e.target.value
                                    this.setState({user:{...val}});
                                    this.validateAndSetUser();
                                }}
                                onBlur={()=>{
                                    const emailRex =
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                    var validObj = {...this.state.validation};
                                    if (emailRex.test(this.state.user.email)) {
                                        validObj.email.isValid = true;
                                        validObj.email.helperText = "";
                                    }else {
                                        validObj.email.isValid = false;
                                        validObj.email.helperText = "Geçerli bir mail adresi girmelisiniz.";
                                    }
                                    this.setState({validation:validObj})
                                }}
                            />
                        </Grid>
                        <Grid item md={this.dialogGridMdSize}>
                        <FormControlLabel control={<Checkbox
                            checked={this.state.user.status}
                            onChange={(event,checked)=>{
                                let user = this.state.user;
                                if(user.status === checked) return;

                                user.status = checked;
                                this.setState({user:{...user}})
                                this.validateAndSetUser();
                            }}
                            />} label="Aktif" />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

UserAdd.defaultProps = {
    setUser:PropTypes.func.isRequired,
    isUpdate:PropTypes.bool,
    userModel: PropTypes.object
};

export default connect(
    mapStateToProps,
)(UserAdd);