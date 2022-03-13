import React from "react";
import TabIn from "./Begin/TabIn";
import Messages from "../Types/Messages";
import {connect} from "react-redux";
import AppBarMenu from "./Navigation/app-bar";
import {Card, Container} from "@material-ui/core";
import ActionBar from "./Navigation/action-bar";

import BackdropComponent from "./ToolBox/backdrop";
import {bindActionCreators} from "redux";
import * as pageActions from "../redux/actions/page-actions";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import PasswordChange from "./Begin/password-change";
import Login from "./Begin/Login";
import User from "../Models/User";

function Layout(props) {
    let loginControl = () => {
         let usr = window.localStorage.getItem("user");
        window.localStorage.removeItem("user");
        let userc = new User();
        userc.userId = 1007;
        userc.firstName = "api";
        userc.lastName = "api";
        userc.email = "api@gmail.com";
        userc.token = "asdasffasdf";
        userc.userName = "api";
        userc.inboxNotificationCount = 0;

        window.localStorage.setItem("user", JSON.stringify(userc));
        console.log("user active :", userc);

        return props.children;
        //todo: test e çıkmadan önce log-in geri aktifleştirilecek.
        // eslint-disable-next-line no-unreachable
        if (
            props.loginJwtObject &&
            props.loginJwtObject.isSuccess &&
            props.loginJwtObject.isNewPassword === false
        ) {
            return props.children;
        } else if (
            props.loginJwtObject &&
            !props.loginJwtObject.isSuccess &&
            props.loginJwtObject.isNewPassword
        ) {
            return <PasswordChange/>;
        } else {
            return (
                <div>
                    <Login/>
                </div>
            );
        }
    };

    return (
        <AppBarMenu>
            <Container maxWidth="xl">
                <Card>
                    <CardActions>
                        <ActionBar/>
                    </CardActions>
                    <CardContent>
                        {props.loginJwtObject ? loginControl() : <p/>}
                    </CardContent>
                </Card>
            </Container>
            <BackdropComponent/>
        </AppBarMenu>
    );
}

//#region redux

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            changeBackdropStatus: bindActionCreators(
                pageActions.changeBackDropStatus,
                dispatch
            ),
        },
    };
}

function mapStateToProps(state) {
    return {
        loginJwtObject: state.changeLoginStatusReducer,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

//#endregion
