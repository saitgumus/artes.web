import { Button } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfoIcon from "@material-ui/icons/Info";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import { CommonTypes, getActionLabel } from "../../Types/Common";

/**
 * action bar için aksiyon döndürür.
 * executeCommand() aksiyon tetikler.
 * @param {props} props (key,icon,text)
 */
const Action = (props) => {
  let key = props.ActionKey;

  console.log("key: ", key);
  return (
    <div style={{ display: "inline-block", marginLeft: "15px" }}>
      {key ? (
        <Button
          variant="contained"
          color={key === CommonTypes.ActionKeys.Close ? "secondary" : "primary"}
          size="small"
          startIcon={props.Icon ? props.Icon : <InfoIcon />}
          onClick={(e) => {
            if (props.onExecuteCommand && props.onExecuteCommand.onExecute)
              props.onExecuteCommand.onExecute(key);
          }}
        >
          {getActionLabel(key)}
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};

Action.propType = {
  ResourceCode: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  onExecuteCommand: state.actionExecuteReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      executeCommand: bindActionCreators(pageActions.executeCommand, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Action);
