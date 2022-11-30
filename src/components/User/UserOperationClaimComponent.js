import React, {Component} from 'react';
import {OperationClaim} from "../../Models/OperationClaim";
import {Avatar, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import {PermContactCalendarRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

class UserOperationClaimComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claims: Object.keys(OperationClaim),
        }
    }

    updateClaims = (claim, isActive) => {
        if (this.props.updateClaims)
            this.props.updateClaims(claim, isActive)
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
                            <PermContactCalendarRounded/>
                        </Avatar>
                    }
                    title={"ARTES"}
                    subheader={"Manage user claims"}>
                </CardHeader>
                <CardContent>
                    <Grid container spacing={3} direction="row">
                        <Grid item>
                            <Grid container spacing={3} direction="column" alignItems="stretch">
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims.includes(OperationClaim.SaveHotelCommand)}
                                        onChange={(event, checked) => {
                                            if (checked && !this.props.userClaims.includes(OperationClaim.GetHotelsQuery)) {
                                                this.updateClaims(OperationClaim.SaveHotelCommand, checked)
                                                this.updateClaims(OperationClaim.GetHotelsQuery, checked)
                                            } else
                                                this.updateClaims(OperationClaim.SaveHotelCommand, checked)
                                        }}
                                    />} label="Otel oluşturma"/>
                                </Grid>
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims.includes(OperationClaim.GetHotelsQuery)}
                                        onChange={(event, checked) => {
                                            this.updateClaims(OperationClaim.GetHotelsQuery, checked)
                                        }}
                                    />} label="Otel listeleme"/>
                                </Grid>
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims.includes(OperationClaim.UpdateHotelCommand)}
                                        onChange={(event, checked) => {
                                            if (checked && !this.props.userClaims.includes(OperationClaim.GetHotelsQuery)) {
                                                this.updateClaims(OperationClaim.UpdateHotelCommand, checked)
                                                this.updateClaims(OperationClaim.GetHotelsQuery, checked)
                                            } else
                                                this.updateClaims(OperationClaim.UpdateHotelCommand, checked)
                                        }}
                                    />} label="Otel güncelleme"/>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={3} direction="column" alignItems="stretch">
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims?.includes(OperationClaim.CreateBrasscoDeviceCommand)}
                                        onChange={(event, checked) => {
                                            if (checked && !this.props.userClaims.includes(OperationClaim.GetBrasscoDevicesQuery)) {
                                                this.updateClaims(OperationClaim.GetBrasscoDevicesQuery, checked)
                                                this.updateClaims(OperationClaim.CreateBrasscoDeviceCommand, checked)
                                            } else
                                                this.updateClaims(OperationClaim.CreateBrasscoDeviceCommand, checked)
                                        }}
                                    />} label="Cihaz oluşturma"/>
                                </Grid>
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims?.includes(OperationClaim.GetBrasscoDevicesQuery)}
                                        onChange={(event, checked) => {
                                            this.updateClaims(OperationClaim.GetBrasscoDevicesQuery, checked)
                                        }}
                                    />} label="Cihaz listeleme"/>
                                </Grid>
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims?.includes(OperationClaim.DeleteBrasscoDeviceCommand)}
                                        onChange={(event, checked) => {
                                            if (checked && !this.props.userClaims.includes(OperationClaim.GetBrasscoDevicesQuery)) {
                                                this.updateClaims(OperationClaim.GetBrasscoDevicesQuery, checked)
                                                this.updateClaims(OperationClaim.DeleteBrasscoDeviceCommand, checked)
                                            } else
                                                this.updateClaims(OperationClaim.DeleteBrasscoDeviceCommand, checked)
                                        }}
                                    />} label="Cihaz silme"/>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={3} direction="column" alignItems="stretch">
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims?.includes(OperationClaim.CreateUserCommand)}
                                        onChange={(event, checked) => {
                                            if (checked && !this.props.userClaims.includes(OperationClaim.GetUsersQuery)) {
                                                this.updateClaims(OperationClaim.GetUsersQuery, checked)
                                                this.updateClaims(OperationClaim.CreateUserCommand, checked)
                                            } else
                                                this.updateClaims(OperationClaim.CreateUserCommand, checked)
                                        }}
                                    />} label="User oluşturma"/>
                                </Grid>
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims?.includes(OperationClaim.GetUsersQuery)}
                                        onChange={(event, checked) => {
                                            this.updateClaims(OperationClaim.GetUsersQuery, checked)
                                        }}
                                    />} label="User listeleme"/>
                                </Grid>
                                <Grid item md={this.dialogGridMdSize}>
                                    <FormControlLabel control={<Checkbox
                                        checked={this.props.userClaims?.includes(OperationClaim.UpdateUserCommand)}
                                        onChange={(event, checked) => {
                                            if (checked && !this.props.userClaims.includes(OperationClaim.GetUsersQuery)) {
                                                this.updateClaims(OperationClaim.GetUsersQuery, checked)
                                                this.updateClaims(OperationClaim.UpdateUserCommand, checked)
                                            } else
                                                this.updateClaims(OperationClaim.UpdateUserCommand, checked)
                                        }}
                                    />} label="User güncelleme"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

UserOperationClaimComponent.propTypes = {
    userClaims: PropTypes.array,
    updateClaims: PropTypes.func.isRequired
};

export default UserOperationClaimComponent;