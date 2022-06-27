import React, {Component} from "react";
import {CommonTypes} from "../Types/Common";
import * as pageActions from "../redux/actions/page-actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Card, Grid, Typography, CardHeader, CardContent, Avatar, TextField} from "@material-ui/core";
import DataTable from "./ToolBox/DataTable";
import DialogForm from "./ToolBox/dialog-form";
import {GetCountryList} from "../Services/CoreService";
import { ShowStatusError, ShowStatusSuccess} from "../Core/Helper";
import Button from "@material-ui/core/Button";
import {GetHotels, SaveHotel, UpdateHotel} from "../Services/HotelService";
import LoadingOverlay from "react-loading-overlay"
import HotelModel from "../Models/hotel/HotelModel";
import HotelAdd from "./hotel-add";


/***
 * ana sayfa
 */
class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);

        this.state = {
            isOpenDialogForm: false,
            isOpenDialogForUpdate:false,
            hotel: {},
            countryList: [],
            hotelList:[],
            isLoading:true,
            selectedHotel:{},
            defaultCountry:{},
            isAddedHotelValid:false
        };

    }

    columns = [
        {
            name: "hotelName",
            label: "Hotel Name",
            options: {filter: true, sort: true},
        },
        {
            name: "hotelAdminName",
            label: "Admin Name",
            options: {filter: true, sort: true},
        },
        {
            name: "hotelAdminMail",
            label: "Administrator",
            options: {filter: true, sort: true},
        },
        {
            name: "creationdate",
            label: "Created At",
            options: {filter: true, sort: true},
        },
        {
            name: "validSectors",
            label: "Valid Sectors",
            options: {filter: true, sort: true},
        },
        {
            name: "allowGeneralCard",
            label: "Allow General Card",
            options: {filter: true, sort: true},
        }
    ];

    componentDidMount() {
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.home.resourceCode
            );
        }

        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }

        this.onLoad();
    }

    onLoad = async ()=>{
        this.getCountries();
        await Promise.all([this.getCountries,this.getList()])
        this.setState({
            isLoading:false
        });
    }

    dialogContent = (<div></div>)

    onExecute = async (key) => {
        switch (key) {
            ///create hotel
            case CommonTypes.ActionKeys.CreateHotel:
                this.setState({isOpenDialogForm: true,isOpenDialogForUpdate:false})
                break;
            
            case CommonTypes.ActionKeys.Edit:
                if(!this.state.selectedHotel.hotelId || this.state.selectedHotel.hotelId < 1){
                    ShowStatusError("güncelleme yapmak için kayıt seçmeniz gerekmektedir.");
                    return;
                }
                    this.setState({isOpenDialogForm: true,isOpenDialogForUpdate:true})
                    break;    
            case CommonTypes.ActionKeys.GetList:
                this.getList();
                break;

                default:
                break;
        }
    };


    dialogGridMdSize = 7;

    getCountries = async () => {
        await GetCountryList()
            .then(
                (data) => {
                    if (data && data.length > 0) {
                        this.setState({countryList: data})
                    }
                }
            ).catch(e => {
                console.error(e);
                ShowStatusError("ülke listesi getirilemedi.");
            })
    }

    onCreate =async (hotelContract) => {
        debugger;
        var hotelModel = new HotelModel();
        hotelModel = {...hotelContract};
        hotelModel.allowGeneralCard = false;
        hotelModel.contactType = 1;

       var response = await SaveHotel(hotelModel);
        if(!response || !response.success){
            ShowStatusError(response.getResultsStringFormat());
            return;
        }
       if(response && response.success){
           ShowStatusSuccess("kayıt başarılı");
           await this.getList();
       }

    }

    onUpdate =async (hotelContract) => {
        console.log("update hotel:",hotelContract);
        debugger;
        var hotelModel = new HotelModel();
        hotelModel = {...hotelContract};
        hotelModel.allowGeneralCard = false;
        hotelModel.contactType = 1;

       var response = await UpdateHotel(hotelModel);
        if(!response || !response.success){
            ShowStatusError(response.getResultsStringFormat());
            return;
        }
       if(response && response.success){
           ShowStatusSuccess("güncellendi.");
           await this.getList();
       }

    }


    async getList(){
        this.setState({isLoading:true})
        GetHotels()
            .then(response => {
             if(!response.success){
                 ShowStatusError(response.getResultsStringFormat());
             }
             if(response.value && response.value.length > 0){
                 this.setState({hotelList:response.value,isLoading:false})
             }
            })
            .catch(
                e=>{
                    ShowStatusError(e.message);
                    this.setState({isLoading:false})
                }
            )
    }

    handleCloseDialog = () => {
        this.setState({isOpenDialogForm: false});
    };
    handleOpenDialog = () => {
        this.setState({isOpenDialogForm: true});
    };

    validateCreateModel = () => {
        return this.state.isAddedHotelValid;
    }

    setHotel = (hotel)=>{
        this.setState({
            hotel:hotel,
            isAddedHotelValid:true
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
                            Hotel
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Card elevation={1}>
                            <DataTable
                                columns={this.columns}
                                data={this.state.hotelList}
                                onSelectedItemChange={(
                                    currentRowIndex,
                                    allRowsIndexes,
                                    rowsSelectedIndex
                                ) => {
                                 
                                    if(this.state.hotelList && this.state.hotelList.length > 0 && rowsSelectedIndex){
                                        var selectedData = this.state.hotelList[rowsSelectedIndex];
                                        this.state.selectedHotel = selectedData
                                    }
                                }
                                }
                            />
                        </Card>
                    </Grid>
                    {this.state.isOpenDialogForm ? (
                        <DialogForm
                            count={this.state.renderCount}
                            title={"Create Hotel"}
                            content={(<HotelAdd 
                                countryList={this.state.countryList} 
                                setHotel={this.setHotel}
                                isUpdate={this.state.isOpenDialogForUpdate}
                                hotelModel={this.state.isOpenDialogForUpdate ? this.state.selectedHotel : undefined} />)}
                            handleClose={this.handleCloseDialog}
                            actions={(
                                <Button autoFocus
                                        disabled={!this.state.isAddedHotelValid}
                                        onClick={()=>{
                                    if(!this.validateCreateModel()){
                                        return;
                                    }
                                    this.handleCloseDialog()
                                    if(this.state.isOpenDialogForUpdate){
                                        this.onUpdate(this.state.hotel)
                                    }
                                    else{
                                        this.onCreate(this.state.hotel)
                                    }
                                }} color="primary">
                                    Gönder
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
