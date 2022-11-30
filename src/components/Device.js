import React, {Component} from "react";
import {CommonTypes} from "../Types/Common";
import * as pageActions from "../redux/actions/page-actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Card, Grid, Typography} from "@material-ui/core";
import DataTable from "./ToolBox/DataTable";
import DialogForm from "./ToolBox/dialog-form";
import {ShowStatusError, ShowStatusSuccess,} from "../Core/Helper";
import LoadingOverlay from "react-loading-overlay"
import {DeleteDevice, GetDevices, SaveDevice} from "../Services/DeviceService";
import Button from "@material-ui/core/Button";
import DeviceAdd from "./DeviceAdd";
import {GetHotels,} from "../Services/HotelService";
import DeviceModel from "../Models/device/DeviceModel";


/***
 * ana sayfa
 */
class DeviceComponent extends Component {
    static displayName = DeviceComponent.name;

    constructor(props) {
        super(props);

        this.state = {
            isOpenDialogForm: false,
            isOpenDialogForUpdate: false,
            device: {},
            deviceList: [],
            hotelList: [],
            isLoading: true,
            selectedDevice: {},
            isAddedDeviceValid: false
        };
    }

    columns = [
        {
            name: "brasscoDeviceId",
            label: "Id",
            options: {filter: true, sort: true}
        },
        {
            name: "deviceTypeCd",
            label: "Type",
            options: {filter: true, sort: true}
        },
        {
            name: "uniqueCode",
            label: "Unique Code",
            options: {filter: true, sort: true},
        },
        {
            name: "hotelId",
            label: "Hotel Id",
            options: {filter: true, sort: true},
        }
    ];

    componentDidMount() {
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.device.resourceCode
            );
        }

        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }

        this.onLoad();
    }

    onLoad = async () => {
        await Promise.all([this.getList(), this.getHotels()])
        this.setState({
            isLoading: false
        });
    }

    dialogContent = (<div></div>)

    onExecute = async (key) => {
        switch (key) {
            ///create device
            case CommonTypes.ActionKeys.CreateDevice:
                this.setState({isOpenDialogForm: true, isOpenDialogForUpdate: false})
                break;

            case CommonTypes.ActionKeys.DeleteDevice:
                if (!this.state.selectedDevice.brasscoDeviceId || this.state.selectedDevice.brasscoDeviceId < 1) {
                    ShowStatusError("işlem yapmak için kayıt seçmeniz gerekmektedir.");
                    return;
                }
                DeleteDevice(this.state.selectedDevice)
                break;
            case CommonTypes.ActionKeys.Refresh:
                this.getList();
                break;

            default:
                break;
        }
    };

    dialogGridMdSize = 7;

    getList = async () => {
        this.setState({isLoading: true})
        GetDevices()
            .then(response => {
                if (!response.success) {
                    ShowStatusError(response.getResultsStringFormat());
                }
                if (response.value && response.value.length > 0) {
                    this.setState({deviceList: response.value, isLoading: false})
                }
            })
            .catch(
                e => {
                    ShowStatusError(e.message);
                    this.setState({isLoading: false})
                }
            )
    }

    getHotels = async () => {
        await GetHotels()
            .then(
                (response) => {
                    if (response.value && response.value.length > 0) {
                        const hotels = response.value.map(
                            (item) => {
                                return {
                                    name: item.hotelName,
                                    value: item.hotelId
                                };
                            }
                        )
                        this.setState({hotelList: hotels})
                    }
                }
            ).catch(e => {
                console.error(e);
                ShowStatusError("hotel listesi getirilemedi.");
            })
    }
    onCreate = async (deviceContract) => {
        let deviceModel = new DeviceModel();
        deviceModel = {...deviceContract};

        var response = await SaveDevice(deviceModel);
        if (!response || !response.success) {
            ShowStatusError(response.getResultsStringFormat());
            return;
        }
        if (response && response.success) {
            ShowStatusSuccess("kayıt başarılı");
            await this.getList();
        }
    }

    onDelete = async (deviceContract) => {
        if (!deviceContract || !deviceContract.brasscoDeviceId) {
            alert('device id bilgisi dolu olmalıdır!');
            return;
        }
        var deviceModel = new DeviceModel();
        deviceModel = {...deviceContract};

        var response = await DeleteDevice(deviceModel);
        if (!response || !response.success) {
            ShowStatusError(response.getResultsStringFormat());
            return;
        }
        if (response && response.success) {
            ShowStatusSuccess("silindi.");
            await this.getList();
        }
    }

    handleCloseDialog = () => {
        this.setState({isOpenDialogForm: false});
    };
    handleOpenDialog = () => {
        this.setState({isOpenDialogForm: true});
    };

    validateCreateModel = () => {
        return this.state.isAddedDeviceValid;
    }

    setDevice = (device) => {
        this.setState({
            device: device,
            isAddedDeviceValid: true
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
                            Device
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Card elevation={1}>
                            <DataTable
                                columns={this.columns}
                                data={this.state.deviceList}
                                onSelectedItemChange={(
                                    currentRowIndex,
                                    allRowsIndexes,
                                    rowsSelectedIndex
                                ) => {
                                    if (this.state.deviceList && this.state.deviceList.length > 0 && rowsSelectedIndex) {
                                        var selectedData = this.state.deviceList[rowsSelectedIndex];
                                        // eslint-disable-next-line react/no-direct-mutation-state
                                        this.state.selectedDevice = selectedData
                                    }
                                }
                                }
                            />
                        </Card>
                    </Grid>
                    {this.state.isOpenDialogForm ? (
                        <DialogForm
                            count={this.state.renderCount}
                            title={"Create Device"}
                            content={(<DeviceAdd
                                hotelList={this.state.hotelList}
                                setDevice={this.setDevice}
                                isUpdate={this.state.isOpenDialogForUpdate}
                                deviceModel={this.state.isOpenDialogForUpdate ? this.state.selectedDevice : undefined}/>)}
                            handleClose={this.handleCloseDialog}
                            actions={(
                                <Button autoFocus
                                        disabled={!this.state.isAddedDeviceValid}
                                        onClick={() => {
                                            if (!this.validateCreateModel()) {
                                                return;
                                            }
                                            this.handleCloseDialog()
                                            if (this.state.isOpenDialogForUpdate) {
                                                this.onUpdate(this.state.device)
                                            } else {
                                                this.onCreate(this.state.device)
                                            }
                                        }} color="primary">
                                    Kaydet
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceComponent);
