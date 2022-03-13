import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {GetActiveLocalUser} from "../../Core/Helper";

function mapStateToProps(state) {
    return {};
}

class UserProfile extends Component {
    
    
    render() {
        let user = GetActiveLocalUser();
        
        return (
            <div>
                <Card style={{width: "100%", alignContent: "center"}}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" style={{backgroundColor: "red"}}>
                                {(user)? user.firstName.substr(0,1):"S"}
                            </Avatar>
                        }
                        title= {user.firstName + " " +user.lastName}
                        subheader="September 14, 2020"
                    />
                    <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {/*kişi hakkında bilgi, cümleler, alıntı, özdeyiş :D*/}
                        </Typography>

                        <Typography variant="body1" color="textPrimary" component="p">
                            <b>Ad:</b> {user.firstName} <br/>
                            <b>Soyad:</b> {user.lastName} <br/>
                            <b>Kullanıcı Adı:</b> {user.userName} <br/>
                            <b>Email:</b> {user.email} <br/>
                            <b>Apartman:</b> {user.apartment && user.apartment.name}
                        </Typography>

                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(UserProfile);