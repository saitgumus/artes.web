import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import DivitContract from "../../Models/DivitContract";
import { getDateIsoDate } from "../../Types/Common";

/**
 * döküman ekleme komponenti.
 * props= onLoadFile({divitContract})
 */
export default class DivitComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      files: [],
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    if (!files || files.length < 1) return;

    let reader = new FileReader();
    let file = files[0];
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      console.log("data", e.target.result);
      let divit = new DivitContract();
      divit.name = file.name;
      divit.path = file.path;
      divit.size = file.size;
      divit.type = file.type;
      divit.uploadDate = getDateIsoDate();
      divit.content = e.target.result;

      if (this.props.onLoadFile) {
        this.props.onLoadFile(divit);
      }
      this.setState({
        files: files,
        open: false,
      });
    };
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleOpen.bind(this)}>Dosya Ekle</Button> */}
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={["image/jpeg", "image/png"]}
          showPreviews={true}
          maxFileSize={1000000}
          onClose={this.handleClose.bind(this)}
          submitButtonText="Ekle"
          cancelButtonText="Vazgeç"
        />
      </div>
    );
  }
}
