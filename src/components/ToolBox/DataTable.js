import React, { Component } from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";

/**
 * listeleme tablosu
 * https://github.com/gregnb/mui-datatables#api
 */
class DataTable extends Component {
  options = {
    filterType: "checkbox",
    onRowSelectionChange: this.props.onSelectedItemChange,
    selectableRows: "single",
    selectableRowsOnClick: true,
    // onRowClick: (rowData, rowMeta) => {
    //   debugger;
    //   //todo : seçili satırla güncelleme yapılabilecek.
    //   var a = rowData;
    //   var g = rowMeta;
    // },
  };

  render() {
    return (
      <div>
        <MUIDataTable
          title={this.props.title}
          data={this.props.data}
          columns={this.props.columns}
          options={this.options}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onSelectedItemChange: PropTypes.func,
};

export default DataTable;
