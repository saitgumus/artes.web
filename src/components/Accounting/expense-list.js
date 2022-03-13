import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ShowStatusError, ShowStatusSuccess } from "../../Core/Helper";
import { InvoiceContract } from "../../Models/Invoice";
import * as pageActions from "../../redux/actions/page-actions";
import { GetExpenceList, GetExpenseDetail } from "../../Services/Accounting";
import { CommonTypes } from "../../Types/Common";
import ApartmentComponent from "../Common/apartment-component";
import DataTable from "../ToolBox/DataTable";
import DialogForm from "../ToolBox/dialog-form";

class ExpenseList extends Component {
  columns = [
    {
      name: "userFullName",
      label: "Kullanıcı",
      options: { filter: true, sort: true },
    },
    {
      name: "apartmentName",
      label: "Apartman Adı",
      options: { filter: true, sort: true },
    },
    {
      name: "companyName",
      label: "Şirket İsmi",
      options: { filter: true, sort: true },
    },
    {
      name: "totalAmount",
      label: "Toplam Tutar",
      options: { filter: true, sort: true },
    },
    {
      name: "invoiceDate",
      label: "Fatura Tarihi",
      options: { filter: true, sort: true },
    },
    {
      name: "invoiceNumber",
      label: "Fatura Numarası",
      options: { filter: true, sort: true },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      apartmentId: null,
      invoiceNumber: "",
      taxNumber: "",
      dataList: [],
      invoiceDetail: null,
      selectedInvoice: {},
      isOpenDialogForm: false,
    };
  }

  componentDidMount() {
    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.ExpenseList.resourceCode
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
        let filter = new InvoiceContract();
        filter.apartmentId = this.state.apartmentId;
        filter.userId = this.state.userId;
        filter.invoiceNumber = this.state.invoiceNumber;
        filter.taxNumber = this.state.taxNumber;

        await GetExpenceList({ ...filter })
          .then((res) => {
            if (res && res.success) {
              if (res.value && res.value.length > 0)
                this.setState({ dataList: res.value });
              ShowStatusSuccess(res.value.length + ": adet kayıt getirildi. ");
            } else if (res && !res.success) {
              ShowStatusError(res.getResultsStringFormat());
            }
          })
          .catch((err) => {
            console.log(err);
            ShowStatusError("liste getirilemedi.");
          });
        break;
      case CommonTypes.ActionKeys.Examine:
        let inv = { ...this.state.selectedInvoice };
        if (inv && inv.invoiceId > 0) {
          await GetExpenseDetail(inv.invoiceId)
            .then((res) => {
              if (res && res.success && res.value) {
                this.setExpenseDialogContent(res.value);
                this.setState({
                  invoiceDetail: res.value,
                  isOpenDialogForm: true,
                });
              } else {
                ShowStatusError("Masraf detayı getirilemedi.");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        break;
      default:
        break;
    }
  };

  dialogContent = (<p>no content..</p>);
  setExpenseDialogContent = (value) => {
    this.dialogContent = (
      <Card>
        <CardHeader
          title={value.apartmentName}
          subheader={value.userFullName}
        />
        <CardContent>
          <Grid container spacing={3} direction={"column"}>
            <Grid container direction={"column"} style={{ marginLeft: "30px" }}>
              <Grid item>
                <Typography variant={"overline"}>
                  Firma:{value.companyName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={"overline"}>
                  Vergi No:{value.taxNumber}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant={"overline"}>
                  Fatura No:{value.invoiceNumber}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant={"button"}>
                  Toplam Tutar: {value.totalAmount}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Açıklama</TableCell>
                      <TableCell>Adet</TableCell>
                      <TableCell>Birim Fiyatı</TableCell>
                      <TableCell>Tutar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {value.invoiceLineList &&
                    value.invoiceLineList.length > 0 ? (
                      value.invoiceLineList.map((line, index) => {
                        return (
                          <TableRow key={"tbl-inv" + index}>
                            <TableCell> {line.description}</TableCell>
                            <TableCell> {line.quantity}</TableCell>
                            <TableCell> {line.unitPrice}</TableCell>
                            <TableCell> {line.amount}</TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <p></p>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  handleCloseDialog = () => {
    this.setState({ isOpenDialogForm: false });
  };
  handleOpenDialog = () => {
    this.setState({ isOpenDialogForm: true });
  };

  render() {
    return (
      <Grid container spacing={5}>
        <Grid item xs={2}>
          <Grid item>
            <Typography variant={"h6"}>Kriterler</Typography>
          </Grid>
          <Grid item>
            <ApartmentComponent />
          </Grid>
          <Grid item>
            <TextField
              label={"Vergi No"}
              fullWidth
              onChange={(e) => {
                this.state({ taxNumber: e.target.value });
              }}
              value={this.state.taxNumber}
            />
          </Grid>
          <Grid item>
            <TextField
              label={"Fatura No"}
              fullWidth
              onChange={(e) => {
                this.state({ invoiceNumber: e.target.value });
              }}
              value={this.state.invoiceNumber}
            />
          </Grid>
        </Grid>
        {/*data table*/}
        <Grid item xs={9}>
          <Paper>
            <DataTable
              columns={this.columns}
              data={this.state.dataList}
              onSelectedItemChange={(
                currentRowIndex,
                allRowsIndexes,
                rowsSelectedIndex
              ) => {
                let selected = this.state.dataList[rowsSelectedIndex[0]];
                if (selected && selected.apartmentId > 0) {
                  this.setState({ selectedInvoice: selected });
                }
                //   if (this.state.messageList.length > 0) {
                //     let lst = this.state.messageList;
                //     let tempList = allRowsIndexes.map((value) => {
                //       return value.dataIndex;
                //     });
                //     let selectedList = [];
                //     tempList.forEach((element) => {
                //       selectedList.push(lst[element]);
                //     });
                //     this.setState({ selectedMessageList: selectedList });
                //   }
              }}
            />
          </Paper>
          {this.state.isOpenDialogForm ? (
            <DialogForm
              title={"Masraf Detayı"}
              content={this.dialogContent}
              handleClose={this.handleCloseDialog}
            />
          ) : (
            <p></p>
          )}
        </Grid>
      </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
