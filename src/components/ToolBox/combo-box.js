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
        let defaultVal = [{name: 'Seçiniz'}]
        this.state = {
            defaultValue: props.defaultValue ? props.defaultValue : undefined,
            dataList: props.itemSource && props.itemSource.length > 0 ? props.itemSource:defaultVal,
            selectedValue: {name: 'Seçiniz'},
            isDisable: props.disabled,
            label: props.label
        }
    }

    componentDidMount() {
        let tempList = [{name: 'Seçiniz'}];
        if (this.props.itemSource.length > 0) {
            tempList.push.apply(this.props.itemSource)
        }
        this.setState({dataList:tempList,selectedValue:tempList[0]})
        if(this.props.defaultValue){
            let dt = this.state.dataList.find((v) => v === this.props.defaultValue)
            if(dt){
                this.setState({selectedValue:dt})
            }
        }
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
                        <TextField {...params} label={this.state.label} variant="outlined"/>
                    )}
                    onChange={(e, value, reason) => {
                        this.setState({selectedValue: value})

                        if (this.props.onSelectedItemChange && value) {
                            this.props.onSelectedItemChange(value);
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
};

export default ComboBox;
