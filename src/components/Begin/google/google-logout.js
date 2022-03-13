import React, {Component} from 'react';
import {GoogleLogout} from "react-google-login";

const ClientId = "526937451548-d0q03t1ass9qgbipavmqms3ttrhpgma6.apps.googleusercontent.com";

class GoogleLogoutComponent extends Component {

    onSuccess = () => {
        console.log("log out is successfully");
    }

    render() {
        return (
            <div>
                <GoogleLogout clientId={ClientId}
                              buttonText={"Logout"}
                              onLogoutSuccess={this.onSuccess}/>
            </div>
        );
    }
}

export default GoogleLogoutComponent;