import React, { Component } from "react";
import User from "../../Models/User";
import { AddUser, GetUsers, UpdateUser } from "../../Services/UserService";
import {CommonTypes} from "../../Types/Common";
import * as pageActions from "../../redux/actions/page-actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Card, Grid, Typography} from "@material-ui/core";
import DataTable from "../ToolBox/DataTable";
import DialogForm from "../ToolBox/dialog-form";
import { ShowStatusError, ShowStatusSuccess} from "../../Core/Helper";
import Button from "@material-ui/core/Button";
import LoadingOverlay from "react-loading-overlay"
import UserAdd from "./User.modal"


class UserScreen extends Component {

    static displayName = UserScreen.name;

    constructor(props) {
        super(props);

        this.state = {
            isOpenDialogForm: false,
            isOpenDialogForUpdate:false,
            user: {},
            userList:[],
            isLoading:true,
            selectedUser:{},
            isAddedUserValid:false
        };
    }

    columns = [
        {
            name:"fullName",
            label:"Name",
            options:{filter: true, sort: true}
        },
        {
            name:"email",
            label:"email",
            options:{filter: true, sort: true}
        },
    ];

    componentDidMount() {
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.user.resourceCode
            );
        }

        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }

        this.onLoad();
    }

    onLoad = async ()=>{
        await Promise.all([this.getList()])
        this.setState({
            isLoading:false
        });
    }

    dialogContent = (<div></div>)
    dialogGridMdSize = 7;

    onExecute = async (key) => {
        switch (key) {
            ///create device
            case CommonTypes.ActionKeys.CreateUser:
                this.setState({isOpenDialogForm: true,isOpenDialogForUpdate:false})
                break;
            
            case CommonTypes.ActionKeys.UpdateUser:
                if(!this.state.selectedUser.userId || 
                    this.state.selectedUser.userId < 1){
                    ShowStatusError("işlem yapmak için kayıt seçmeniz gerekmektedir.");
                    return;
                }
                    this.setState({isOpenDialogForm: true,isOpenDialogForUpdate:true})
                    break;    
                    case CommonTypes.ActionKeys.DeleteUser:
                        if(!this.state.selectedUser.userId || 
                            this.state.selectedUser.userId < 1){
                            ShowStatusError("işlem yapmak için kayıt seçmeniz gerekmektedir.");
                            return;
                        }
                            this.setState({isLoading: true})
                            this.onDelete(this.state.selectedUser)
                            break;  
            case CommonTypes.ActionKeys.GetList:
                this.getList();
                break;

                default:
                break;
        }
    };

        async getList(){
            this.setState({isLoading:true})
            GetUsers()
                .then(response => {
                 if(!response.success){
                     ShowStatusError(response.getResultsStringFormat());
                     this.setState({isLoading:true})
                 }
                 
                 if(response.value && response.value.length > 0){
                     this.setState({userList:response.value,isLoading:false})
                 }
                })
                .catch(
                    e=>{
                        ShowStatusError(e.message);
                        this.setState({isLoading:false})
                    }
                )
        }


        onCreate =async (userContract) => {
            let userModel = new User();
            userModel = {...userContract};
            userModel.password = "1234";
            userModel.userType = 2;
            userModel.hotelId = 1;
    
            var response = await AddUser(userModel);
            if(!response || !response.success){
                ShowStatusError(response.getResultsStringFormat());
                return;
            }
            if(response && response.success){
                ShowStatusSuccess("kayıt başarılı");
                await this.getList();
            }
        }
        onUpdate =async (userContract) => {
            let userModel = new User();
            userModel = {...userContract};
    
            var response = await UpdateUser(userModel);
            if(!response || !response.success){
                ShowStatusError(response.getResultsStringFormat());
                return;
            }
            if(response && response.success){
                ShowStatusSuccess("güncelleme başarılı");
                await this.getList();
            }
        }

        onDelete =async (userContract) => {
            if(!userContract || !userContract.id){
                alert('user id bilgisi dolu olmalıdır!');
                return;
            }
            var userModel = new User();
            userModel = {...userModel};
    
            var response = await User(userModel);
            if(!response || !response.success){
                ShowStatusError(response.getResultsStringFormat());
                return;
            }
            if(response && response.success){
                ShowStatusSuccess("silindi.");
                await this.getList();
            }
            this.setState({isLoading: false})
        }


        handleCloseDialog = () => {
            this.setState({isOpenDialogForm: false});
        };
        handleOpenDialog = () => {
            this.setState({isOpenDialogForm: true});
        };
    
        validateCreateModel = () => {
            return this.state.isAddedUserValid;
        }
    
        setUser = (user)=>{
            this.setState({
                user,
                isAddedUserValid:true
            });
        }

        render() {
            return (
                <LoadingOverlay
                active={this.state.isLoading}
                spinner
                text={'loading...'}>
                    <Grid container direction="column" spacing={3}>
    
                        <Grid item>
                            <Typography variant='h4'>
                                User
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Card elevation={1}>
                                <DataTable
                                    columns={this.columns}
                                    data={this.state.userList}
                                    onSelectedItemChange={(
                                        currentRowIndex,
                                        allRowsIndexes,
                                        rowsSelectedIndex
                                    ) => {
                                        if(this.state.userList && this.state.userList.length > 0 && rowsSelectedIndex){
                                            var selectedData = this.state.userList[rowsSelectedIndex];
                                            // eslint-disable-next-line react/no-direct-mutation-state
                                            this.state.selectedUser = selectedData
                                        }
                                    }
                                    }
                                />
                            </Card>
                        </Grid>
                       {this.state.isOpenDialogForm ? (
                            <DialogForm
                                count={this.state.renderCount}
                                title={"Create User"}
                                content={(<UserAdd
                                    setUser={this.setUser}
                                    isUpdate={this.state.isOpenDialogForUpdate}
                                    userModel={this.state.isOpenDialogForUpdate ? this.state.selectedUser : undefined} />)}
                                handleClose={this.handleCloseDialog}
                                actions={(
                                    <Button autoFocus
                                            disabled={!this.state.isAddedUserValid}
                                            onClick={()=>{
                                        if(!this.validateCreateModel()){
                                            return;
                                        }
                                        this.handleCloseDialog()
                                        if(this.state.isOpenDialogForUpdate){
                                            this.onUpdate(this.state.user)
                                        }
                                        else{
                                            this.onCreate(this.state.user)
                                        }
                                    }} color="primary">
                                        {
                                            this.state.isOpenDialogForUpdate ? "Güncelle" : "Kaydet"
                                        }
                                    </Button>
                                )}
                            />
                        ) : (
                            <p></p>
                        )}
                    </Grid>
                </LoadingOverlay>
        );
        }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            changeActiveResourceCode: bindActionCreators(
                pageActions.changeActiveResourceCode,
                dispatch
            ),
            executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
