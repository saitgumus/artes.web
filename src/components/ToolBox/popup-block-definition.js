import React, { Component } from "react";
import { connect } from "react-redux";
import * as apartmentActions from "../../redux/actions/apertment-actions";
import ButtonWithIcon from "./icon-buttons";
import { bindActionCreators } from "redux";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Modal,
  TextField,
} from "@material-ui/core";
import { CommonTypes } from "../../Types/Common";
import BlockContract from "../../Models/BlockContract";
import CheckboxList from "./list";
import { ShowStatusWarning } from "../../Core/Helper";

class BlockDefinition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      blockList: [],
    };
  }

  toggle = () => this.setState({ modal: !this.state.modal });
  blockCode = "";
  /**
   * listeleme komponeni için düzenleme yapar
   */
  getBlockListForCheckBoxList = () => {
    var templst = this.state.blockList.map((val, ind) => {
      return {
        label: val.Code,
      };
    });

    return templst;
  };

  render() {
    return (
      <div>
        <Modal
          open={this.state.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Card>
            <CardHeader title="Blok Tanımı"></CardHeader>
            <CardContent>
              <TextField
                type="string"
                label="Blok Kodu"
                onChange={(e) => {
                  this.blockCode = e.target.value;
                }}
                onBlur={(e) => {
                  e.target.value = "";
                }}
                onFocus={(e) => {
                  e.target.value = "";
                }}
              ></TextField>
              <CheckboxList
                list={this.getBlockListForCheckBoxList()}
                onDelete={(label) => {
                  if (label && label.length > 0) {
                    var lst = this.state.blockList.filter(
                      (x) => x.Code !== label
                    );
                    this.setState({ blockList: lst });
                  }
                }}
              ></CheckboxList>
            </CardContent>
            <CardActions>
              <ButtonWithIcon
                actionType={CommonTypes.ActionTypes.add}
                onClick={(e) => {
                  var lst = this.state.blockList;
                  if (lst.find((r) => r.Code === this.blockCode)) {
                    ShowStatusWarning(
                      this.blockCode + " isimli blok zaten ekli"
                    );
                    return;
                  }
                  lst.push(new BlockContract(this.blockCode));
                  this.setState({ blockList: lst });
                }}
              ></ButtonWithIcon>
              <ButtonWithIcon
                actionType={CommonTypes.ActionTypes.save}
                onClick={(e) => {
                  if (this.props.actions.addBlock) {
                    this.props.actions.addBlock(this.state.blockList);
                    this.toggle();
                  }
                }}
              ></ButtonWithIcon>
              <ButtonWithIcon
                actionType={CommonTypes.ActionTypes.close}
                onClick={(e) => {
                  this.toggle();
                }}
              ></ButtonWithIcon>
            </CardActions>
          </Card>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      addBlock: bindActionCreators(apartmentActions.saveBlock, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockDefinition);
