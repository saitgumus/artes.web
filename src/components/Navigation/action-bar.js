import React, { Component } from "react";
import { connect } from "react-redux";
import Action from "../ToolBox/action";
import { CommonTypes } from "../../Types/Common";

import SaveIcon from "@material-ui/icons/Save";
import ListIcon from "@material-ui/icons/List";
import CreateIcon from "@material-ui/icons/Create"; //düzenle
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew"; //kapat
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"; // temizle
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded"; // oku
import FindInPageOutlinedIcon from "@material-ui/icons/FindInPageOutlined"; // incele
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded"; // sözleşme ekle
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded"; // döküman
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'; // yenile
import DeleteOutlineRounded from '@material-ui/icons/DeleteOutlineRounded'; // yenile

class ActionBar extends Component {
  getIcon = (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.CreateDistributor:
        return <SaveIcon/>
      case CommonTypes.ActionKeys.CreateHotel:
        return <SaveIcon/>
      case CommonTypes.ActionKeys.CreateDevice:
        return <SaveIcon/>  
        case CommonTypes.ActionKeys.DeleteDevice:
        return <DeleteOutlineRounded/>  
        
      case CommonTypes.ActionKeys.CreateUser:
        return <SaveIcon/>  
      case CommonTypes.ActionKeys.UpdateUser:
        return <CreateIcon/>  
      case CommonTypes.ActionKeys.DeleteUser:
        return <DeleteOutlineRounded/>  

      case CommonTypes.ActionKeys.Save:
        return <SaveIcon />;
      case CommonTypes.ActionKeys.GetList:
        return <ListIcon />;
      case CommonTypes.ActionKeys.Clean:
        return <InsertDriveFileIcon />;
      case CommonTypes.ActionKeys.Edit:
        return <CreateIcon />;
      case CommonTypes.ActionKeys.Close:
        return <PowerSettingsNewIcon />;
      case CommonTypes.ActionKeys.Read:
        return <ImportContactsRoundedIcon />;
      case CommonTypes.ActionKeys.Examine:
        return <FindInPageOutlinedIcon />;
      case CommonTypes.ActionKeys.AddAgreement:
        return <PostAddRoundedIcon />;
      case CommonTypes.ActionKeys.Divit:
        return <AttachFileRoundedIcon />;
      case CommonTypes.ActionKeys.Refresh:
        return <RefreshRoundedIcon/>;

      default:
        break;
    }
  };

  static executeCommand(key) {
    alert("no event. key:" + key);
    return;
  }

  generateActions = () => {
    if (
      this.props.actionListInfo &&
      this.props.actionListInfo.actionKeyList &&
      this.props.actionListInfo.actionKeyList.length > 0
    ) {
      let rtnObj = this.props.actionListInfo.actionKeyList.map(
        (value, index) => {
          return (
            <Action
              key={index + "apbar"}
              ActionKey={value}
              Icon={this.getIcon(value)}
              ResourceCode={this.props.actionListInfo.resourceCode}
              executeCommand
              onExecuteCommand={ActionBar.executeCommand}
            />
          );
        }
      );

      return rtnObj;
    }
  };

  render() {
    return <div>{this.generateActions()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    actionListInfo: state.actionListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar);
