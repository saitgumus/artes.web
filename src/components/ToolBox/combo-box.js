import React, {Component} from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {TextField} from "@material-ui/core";

/**
 * combobox component
 * @param {*} props props
 */
class ComboBox extends Component {

    constructor(props) {
        super(props);
        let defaultList = [{name: 'Seçiniz'}]
        this.state = {
            defaultValue: props.defaultValue ? props.defaultValue : undefined,
            dataList: props.itemSource && props.itemSource.length > 0 ? props.itemSource:defaultList,
            selectedValue: {name: 'Seçiniz'},
            isDisable: props.disabled,
            label: props.label
        }
    }

    componentDidMount() {
        let tempList = [];
        if (this.props.itemSource.length > 0) {
            tempList.push(...this.props.itemSource);
        if(this.props.defaultValue){
            // eslint-disable-next-line no-unused-expressions
         let tlst = this.props.itemSource.find((val) => val === this.props.defaultValue);
         if(tlst && tlst.length>0) this.state.selectedValue = tlst[0];
        }
        }
        this.setState({dataList:tempList})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.itemSource.length !== prevProps.itemSource.length){
            let tempList = [];
            if (this.props.itemSource.length > 0) {
               tempList = this.props.itemSource;
               tempList.splice(0,0,{name: 'Seçiniz'})
            }
            this.setState({dataList:tempList,selectedValue:tempList[0]})
        }
        if(this.props.defaultValue !== prevProps.defaultValue){
            if(this.props.defaultValue){
                // eslint-disable-next-line no-unused-expressions
                let tlst = this.props.itemSource.filter((val) => val === this.props.defaultValue);
                if(tlst && tlst.length>0){
                    this.setState({selectedValue:tlst[0]})
                }
            }
        }
    }

    render() {
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.dataList}
                    value={this.state.selectedValue}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} label={this.state.label} variant="outlined" fullWidth={this.props.fullWidth}/>
                    )}
                    onChange={(e, value, reason) => {
                        if(value){
                        this.setState({selectedValue: value})
                        if (this.props.onSelectedItemChange) {
                            this.props.onSelectedItemChange(value);
                        }
                        }
                    }}
                    fullWidth
                    disabled={this.state.isDisable}
                />
            </div>
        );
    }

}

ComboBox.propTypes = {
    label: PropTypes.string.isRequired,
    onSelectedItemChange: PropTypes.func,
    itemSource: PropTypes.array.isRequired,
    fullWidth: PropTypes.bool,
    defaultValue:PropTypes.object
};

export default ComboBox;
