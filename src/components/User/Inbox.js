import React, { Component } from "react";
import { CommonTypes, getDateIsoDate } from "../../Types/Common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  GetUserInboxList,
  updateMessageStatusForReaded,
} from "../../Services/UserService";
import { InboxmessageContract } from "../../Models/InboxMessageContract";
import TextField from "@material-ui/core/TextField";
import DataTable from "../ToolBox/DataTable";
import DialogForm from "../ToolBox/dialog-form";
import { Card, CardHeader } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { ShowStatusError, ShowStatusWarning } from "../../Core/Helper";

const style = {
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
  },
};

/**
 * gelen kutusu sayfası
 */
class InboxComponent extends Component {
  columns = [
    {
      name: "senderFullName",
      label: "Gönderen",
      options: { filter: true, sort: true },
    },
    {
      name: "sendDate",
      label: "Gönderim Tarihi",
      options: { filter: true, sort: true },
    },
    {
      name: "message",
      label: "Mesaj",
      options: { filter: true, sort: true },
    },
    {
      name: "readStatusText",
      label: "Durumu",
      options: { filter: true, sort: true },
    },
  ];

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      receiverUserId: 0,
      startDate: getDateIsoDate(),
      endDate: getDateIsoDate(),
      messageList: [],
      isOpenDialogForm: false,
      selectedMessageList: [],
    };
  }

  componentDidMount() {
    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.userInbox.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
    //#endregion
  }

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.GetList:
        let inboxContract = new InboxmessageContract();

        let userActive = JSON.parse(localStorage.getItem("user"));
        if (userActive && userActive.userId > 0) {
          inboxContract.receiverUserId = userActive.userId;
        } else {
          console.log("aktif kullanıcı bilgisi alınamadı.");
          return;
        }

        inboxContract.startDate = this.state.startDate;
        inboxContract.endDate = this.state.endDate;

        //#region mesaj listesi getiriliyor..

        await GetUserInboxList(inboxContract)
          .then((res) => {
            if (res.success) {
              this.setState({ messageList: res.value });
            } else {
              console.log(res.getResultsStringFormat());
            }
          })
          .catch((err) => {
            ShowStatusError("mesajlar getirilemedi.");
            console.log(err);
          });
        //#endregion
        break;

      //incele / ayrıntılar
      case CommonTypes.ActionKeys.Read:
        let lst = this.state.selectedMessageList;
        if (lst && lst.length === 1) {
          let messageContract = new InboxmessageContract();
          messageContract = lst[0];

          this.dialogContent = (
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    style={{ backgroundColor: "#26bdba" }}
                  >
                    {messageContract.senderFirstName
                      ? messageContract.senderFirstName.substr(0, 1)
                      : "S"}
                  </Avatar>
                }
                title={messageContract.senderFullName}
                subheader={messageContract.sendDate}
              />
              <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                  Mesaj içeriği..
                </Typography>

                <Typography variant="body1" color="textPrimary" component="p">
                  {messageContract.message}
                </Typography>
              </CardContent>
            </Card>
          );

          //mesaj state güncelleme işlemi
          await updateMessageStatusForReaded(messageContract.inboxId);

          this.setState({ isOpenDialogForm: true });
        } else {
          ShowStatusWarning("sadece 1 adet kayıt seçiniz.");
        }
        break;
      default:
        break;
    }
  };

  dialogContent = (<p>no content..</p>);

  handleCloseDialog = () => {
    this.setState({ isOpenDialogForm: false });
  };
  handleOpenDialog = () => {
    this.setState({ isOpenDialogForm: true });
  };
  render() {
    return (
      <div style={style.root}>
        <Grid container spacing={2}>
          {/*kriterler*/}
          <Grid item xs={3}>
            <Paper elevation={0}>
              <TextField
                type="date"
                label={"Başlangıç Tarihi"}
                min={"2020-01-01"}
                max={Date.now()}
                value={this.state.startDate}
                onChange={(e) => {
                  this.setState({ startDate: e.target.value });
                }}
              />
            </Paper>
            <Paper elevation={0}>
              <TextField
                type="date"
                label={"Bitiş Tarihi"}
                min={"2020-01-01"}
                max={Date.now()}
                value={this.state.endDate}
                onChange={(e) => {
                  this.setState({ endDate: e.target.value });
                }}
              />
            </Paper>
          </Grid>

          {/*data table*/}
          <Grid item xs={9}>
            <Paper>
              <DataTable
                columns={this.columns}
                data={this.state.messageList}
                onSelectedItemChange={(
                  currentRowIndex,
                  allRowsIndexes,
                  rowsSelectedIndex
                ) => {
                  if (this.state.messageList.length > 0) {
                    let lst = this.state.messageList;
                    let tempList = allRowsIndexes.map((value) => {
                      return value.dataIndex;
                    });
                    let selectedList = [];
                    tempList.forEach((element) => {
                      selectedList.push(lst[element]);
                    });
                    this.setState({ selectedMessageList: selectedList });
                  }
                }}
              />
            </Paper>
            {this.state.isOpenDialogForm ? (
              <DialogForm
                title={"Mesaj"}
                content={this.dialogContent}
                handleClose={this.handleCloseDialog}
              />
            ) : (
              <p></p>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      changeBackdropStatus: bindActionCreators(
        pageActions.changeBackDropStatus,
        dispatch
      ),
      changeActiveResourceCode: bindActionCreators(
        pageActions.changeActiveResourceCode,
        dispatch
      ),
      executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxComponent);
