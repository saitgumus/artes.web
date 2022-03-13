import React from "react";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import { CommonTypes } from "../../Types/Common";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * the button with icon
 * @param {actionType:string,onClick:func} props icon button
 */
export default function ButtonWithIcon(props) {
  const setIconToButton = () => {
    if (props.actionType) {
      switch (props.actionType) {
        case CommonTypes.ActionTypes.add:
          return <AddIcon color="primary"></AddIcon>;
        case CommonTypes.ActionTypes.save:
          return <SaveIcon color="primary"></SaveIcon>;
        case CommonTypes.ActionTypes.delete:
          return <DeleteIcon color="action"></DeleteIcon>;
        case CommonTypes.ActionTypes.close:
          return <CancelIcon color="error"></CancelIcon>;
        default:
          return <InfoIcon></InfoIcon>;
      }
    }
  };

  return <IconButton onClick={props.onClick}>{setIconToButton()}</IconButton>;
}

ButtonWithIcon.prototype = {
  actionType: PropTypes.string.isRequired,
};
