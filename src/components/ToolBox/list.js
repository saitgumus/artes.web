import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonWithIcon from "./icon-buttons";
import { CommonTypes } from "../../Types/Common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

/**
 * list with checkbox
 * @param {list:array,isCheckBoxVisible:boolean,onDelete:func} props list
 */
export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const isCheckBoxVisible = props.isCheckBoxVisible ? true : false;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const list = props.list;

  return (
    <List className={classes.root}>
      {list.map((value, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                hidden={!isCheckBoxVisible}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.label} />
            <ListItemSecondaryAction>
              <ButtonWithIcon
                actionType={CommonTypes.ActionTypes.delete}
                onClick={(e) => {
                  if (props.onDelete) {
                    props.onDelete(value.label);
                  }
                }}
              ></ButtonWithIcon>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
