import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

/**
 * dialog form
 * @param props
 * @returns {*}
 * @constructor
 */
export default function DialogForm(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    if (props.handleClose) props.handleClose();

    setOpen(false);
  };


  return (
      <Dialog
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          {props.content ? props.content : <p>no content.</p>}
        </DialogContent>
        <DialogActions>
          {props.actions ? (
            props.actions
          ) : (
            <Button autoFocus onClick={handleClose} color="primary">
              Tamam
            </Button>
          )}
        </DialogActions>
      </Dialog>
  );
}

DialogForm.propTypes = {
 actions: PropTypes.any,
 content:PropTypes.any.isRequired,
 title:PropTypes.any.isRequired
}
