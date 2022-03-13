import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import React, { Component } from "react";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DataSheetGrid, textColumn, floatColumn } from "react-datasheet-grid";
import { CommonTypes, getDateIsoDate } from "../../Types/Common";
import { bindActionCreators } from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import DateTimeComponent from "../ToolBox/datetime-component";
import ApartmentComponent from "../Common/apartment-component";
import {
  GetIntValue,
  IsNullOrEmpty,
  ShowStatusError,
  ShowStatusSuccess,
} from "../../Core/Helper";
import { SaveExpense } from "../../Services/Accounting";
import { InvoiceContract, InvoiceLineContract } from "../../Models/Invoice";

const columns = [
  textColumn({ key: "name", title: "Ürün/Hizmet Adı" }),
  floatColumn({ key: "quantity", title: "Adet" }),
  floatColumn({ key: "unitprice", title: "Birim Fiyatı (₺)" }),
  floatColumn({ key: "amount", title: "Tutar" }),
];

/**
 * masraf giriş ekranı
 * ResourceCode: EXPENT
 */
class ExpenseEntry extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      data: [{ name: "", quantity: 0, amount: 0, unitprice: 0 }],
      invoiceDate: getDateIsoDate(),
      companyName: undefined,
      taxNumber: undefined,
      invoiceNumber: undefined,
      totalAmount: 0,
      selectedApartmentId: -1,
    };
  }
  componentDidMount() {
    //#region action
    if (this.props.actions.changeActiveResourceCode) {
      this.props.actions.changeActiveResourceCode(
        CommonTypes.Resources.defineMember.resourceCode
      );
    }
    if (this.props.actions.executeCommand) {
      this.props.actions.executeCommand(this.onExecute);
    }
    //#endregion
  }

  onExecute = async (key) => {
    switch (key) {
      case CommonTypes.ActionKeys.Save:
        //#region control
        //boş satırlar varsa fatura kaleminden çıkarılır.

        let invoiceLineList = this.state.data.filter(
          (x) =>
            (x.name && x.name !== null) ||
            (x.amount && x.amount !== null) ||
            (x.quantity && x.quantity !== null) ||
            (x.unitprice && x.unitprice !== null)
        );

        if (IsNullOrEmpty(this.state.invoiceNumber)) {
          ShowStatusError("Fatura numarası doldurulması zorunludur.");
          return;
        }
        if (IsNullOrEmpty(this.state.taxNumber)) {
          ShowStatusError("vergi numarası doldurulması zorunludur.");
          return;
        }
        if (IsNullOrEmpty(this.state.companyName)) {
          ShowStatusError("Firma adını giriniz.");
          return;
        }
        if (GetIntValue(this.state.totalAmount) < 1) {
          ShowStatusError(
            "1 ₺'den daha küçük tutarda fatura girişi yapılamaz."
          );
          return;
        }
        if (GetIntValue(this.state.selectedApartmentId) < 1) {
          ShowStatusError("Apartman seçimi yapınız.");
          return;
        }

        if (invoiceLineList.length < 1) {
          ShowStatusError("Fatura kalemlerini giriniz.");
          return;
        } else {
          for (const item of invoiceLineList) {
            if (IsNullOrEmpty(item.name)) {
              ShowStatusError(
                "tüm kalemler için masraf (hizmet/iş) adı doldurulmalıdır."
              );
              return;
            }
            if (GetIntValue(item.quantity) < 1) {
              ShowStatusError(
                "Fatura kalemleri için miktar 1'den küçük olamaz"
              );
              return;
            }
          }
        }
        //#endregion

        var expenseContract = new InvoiceContract();
        expenseContract.invoiceNumber = this.state.invoiceNumber;
        expenseContract.invoiceDate = this.state.invoiceDate;
        expenseContract.taxNumber = this.state.taxNumber;
        expenseContract.totalAmount = this.state.totalAmount;
        expenseContract.companyName = this.state.companyName;
        expenseContract.apartmentId = this.state.selectedApartmentId;
        expenseContract.invoiceLineList = invoiceLineList.map((v, i) => {
          let invLine = new InvoiceLineContract();
          invLine.amount = v.amount;
          invLine.quantity = v.quantity;
          invLine.description = v.name;
          invLine.unitPrice = v.unitprice;
          return invLine;
        });

        await SaveExpense(expenseContract)
          .then((res) => {
            if (res.success) {
              ShowStatusSuccess("Masraf girişi yapıldı.");
              this.props.history.push({
                pathname: "/",
              });
            } else {
              ShowStatusError(res.getResultsStringFormat());
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        break;
    }
  };

  onChangeDate = (date) => {
    this.setState({ invoiceDate: date });
  };
  onChangeApartment = (apartment) => {
    if (apartment && apartment.apartmentId > 0) {
      this.setState({ selectedApartmentId: apartment.apartmentId });
    }
  };
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ApartmentComponent onChange={this.onChangeApartment} />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems={"flex-start"}
            spacing={3}
            direction={"row"}
          >
            <Grid item xs={6}>
              <TextField
                label="Firma Adı"
                type="text"
                fullWidth
                onChange={(e) => this.setState({ companyName: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Fatura Numarası"
                type="text"
                fullWidth
                onChange={(e) =>
                  this.setState({ invoiceNumber: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Vergi Numarası"
                type="text"
                fullWidth
                onChange={(e) => this.setState({ taxNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <DateTimeComponent
                label={"Fatura Tarihi"}
                onChangeDate={this.onChangeDate}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={1}>
            <Typography variant={"subtitle1"}>Fatura Kalemleri</Typography>
            <Typography
              variant={"inherit"}
              color={"textSecondary"}
              component="p"
            >
              Fatura satırlarını ekleyiniz.
            </Typography>
            <DataSheetGrid
              data={this.state.data}
              onChange={(data) => {
                let total = 0;
                if (data.length > 0) {
                  data.forEach((element, i, self) => {
                    if (element.amount) total += element.amount;
                  });
                }
                this.setState({ data: data, totalAmount: total });
              }}
              columns={columns}
            />
          </Paper>
        </Grid>
        <Grid container spacing={3} justify={"flex-end"}>
          <Grid item xs={3}>
            <TextField
              label="Toplam"
              type="text"
              disabled
              value={this.state.totalAmount}
            />
          </Grid>
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
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseEntry);
