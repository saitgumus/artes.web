import React, {Component} from 'react';
import {Card, CardHeader} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {IsNullOrEmpty} from "../../Core/Helper";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

/**
 * the dynamic lisit
 */
class DynamicList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title : props.title ? props.title:'dynamic list component',
            list:[],
            footer:props.footer ? props.footer:undefined,
            tempValue:''
        }
    }
    
    addListItem = (value)=>{
        let temp = this.state.list;
        temp.push(value);
        this.setState({list:temp,tempValue:''})
        if(this.props.onChangeList){
            this.props.onChangeList(this.state.list)  
        } 
    }
    
    
    render() {
        return (
            <Card>
                <CardHeader
                title={this.state.title}
                >
                    <Typography variant={"h4"} color={"textSecondary"} align={"center"}>
                        {this.state.title}asdasd
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AddCircleOutlineRoundedIcon
                                color={"action"}
                                onClick={e =>{
                                    if(IsNullOrEmpty(this.state.tempValue))
                                        return;
                                    this.addListItem(this.state.tempValue)
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                type={'text'}
                                fullWidth
                                required
                                label={'Değer'}
                                value={this.state.tempValue}
                                onChange={e =>{
                                    this.setState({tempValue:e.target.value})
                                }}
                            />
                        </Grid>
                    </Grid>
                    <List>
                        {this.state.list.map( (value,index)=>{
                            return (
                                <ListItem key={index+'dynamiclstitem'}>
                                    <Typography variant={"body1"} color={"textPrimary"} >
                                        {value}
                                    </Typography>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </CardContent>
            </Card>
        );
    }
}

DynamicList.propTypes = {
    onChangeList: PropTypes.func,
    title: PropTypes.string.isRequired
}
export default DynamicList;