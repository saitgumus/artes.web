import React, {Component} from 'react';
import {connect} from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {CommonTypes} from "../../Types/Common";
import {GetUserVote, GetVoteResult, UserToVote, GetUsedUserVote} from "../../Services/VoteService";
import {bindActionCreators} from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import {CardHeader} from "@material-ui/core";
import ChartComponent from "../ToolBox/chart";
import DialogForm from "../ToolBox/dialog-form";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {GetIntValue} from "../../Core/Helper";
import Alertify from "alertifyjs";
import {VoteResultContract} from "../../Models/VoteContract";


/**
 * Anket oy kullanımı ve sonuçları getirilir..
 */
class VotingAndResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            voteList: [],
            usedVoteList: [],
            selectedVote: {},
            userChoice: {
                voteOption: {
                    code: 0,
                    description: ''
                }
            },
            openVoteDialog: false,
            voteResultList: [],
            voteResultKeyList: [],
            chartData: [{
                name: "",
                keyList: []
            }]
        }
    }


    componentDidMount() {

        //beklemede olan anketler getirilecek..

        this.getUserVotes();
        this.getUsedVotes();

        //#region action
        if (this.props.actions.changeActiveResourceCode) {
            this.props.actions.changeActiveResourceCode(
                CommonTypes.Resources.VotingAndResult.resourceCode
            );
        }
        if (this.props.actions.executeCommand) {
            this.props.actions.executeCommand(this.onExecute);
        }
        //#endregion
    }

    async getUserVotes() {
        await GetUserVote().then(
            res => {
                if (res.success) {
                    this.setState({voteList: res.value})
                } else {
                    Alertify.notify(res.getResultsStringFormat());
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    onExecute = async (key) => {
        switch (key) {
            case CommonTypes.ActionKeys.GetList:

                break;

            case CommonTypes.ActionKeys.Clean:

                break;
            default:
                break;
        }
    };

    handleCloseDialog = () => {

        let option = this.state.userChoice.voteOption;

        if (GetIntValue(option.code) > 0) {
            UserToVote(option, this.state.selectedVote)
                .then(
                    res => {
                        if (res.success) {
                            Alertify.success('Seçiminiz kaydedildi.')
                        } else {
                            Alertify.error(res.getResultsStringFormat());
                        }
                    }
                ).catch(
                err => {
                    Alertify.error('Bir sorun oluştu..');
                    console.log(err);
                }
            )
        }

        this.setState({openVoteDialog: false})
    }

    getVoteResult = async (voteContract) => {

        await GetVoteResult(voteContract)
            .then(
                res => {
                    if (res.success) {
                        let list = res.value;
                        let tmplist = [];
                        let dataKeys = [];
                        if (list && list.length > 0) {
                            //VoteResultContract
                            for (let item of list) {
                                // if(!IsInvalidIndex(keylist.findIndex(x => x === item))){
                                //     keylist.push(item.description);
                                // }
                                if (!tmplist[item.optionDescription]) {
                                    tmplist[item.optionDescription] = item.voteCount;
                                    dataKeys.push(item.optionDescription);
                                }
                            }

                        }
                        //data manupulation
                        let tempKeyObject = Object.assign({}, tmplist);
                        let dataList = [];
                        let data = new VoteResultContract();
                        data.name = list[0].name;
                        data = {...data, ...tempKeyObject, keyList: dataKeys};
                        dataList.push(data);
                        this.setState({voteResultList: list, voteResultKeyList: dataKeys, chartData: dataList})

                    } else {
                        Alertify.warning(res.getResultsStringFormat());
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    Alertify.error('Şu anda işlem yapılamıyor.');
                }
            )
    }

    getUsedVotes = async () => {
        await GetUsedUserVote()
            .then(
                res => {
                    if (res.success) {
                        this.setState({usedVoteList: res.value})
                    } else {
                        Alertify.notify(res.getResultsStringFormat());
                    }
                }
            ).catch(
                err => {
                    Alertify.error(err.toString());
                    console.log(err);
                }
            )
    }

    selectedValueChanged = (e) => {
        let option = this.state.userChoice;
        option.voteOption.code = GetIntValue(e.target.value);
        this.setState({userChoice: option});
    }

    dialogContent = (<p>no content..</p>);
    setVoteDialogContent = (value) => {
        this.dialogContent = (
            <Card>
                <CardHeader
                    title={value.name}
                    subheader={value.description}
                />
                <CardContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Seçim</FormLabel>
                        <RadioGroup aria-label="Vote" name="vote"
                                    onChange={(e) => {
                                        this.selectedValueChanged(e)
                                    }}>
                            {
                                (value.optionList && value.optionList.length > 0) ?
                                    value.optionList.map(
                                        (val, ind) => {
                                            return (
                                                <FormControlLabel
                                                    key={ind + 'votOpt'}
                                                    value={val.code.toString()} control={<Radio/>}
                                                    label={val.description}
                                                />
                                            )
                                        }
                                    ) : <p></p>
                            }
                        </RadioGroup>
                    </FormControl>
                </CardContent>
            </Card>
        )
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={0}>
                            <Typography color={"textPrimary"} variant={"h6"}>
                                Bekleyen anketler.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid container justify={"flex-start"} aria-orientation={"horizontal"} spacing={3}>
                        {
                            (this.state.voteList && this.state.voteList.length > 0) ?
                                this.state.voteList.map(
                                    (val, ind) => {
                                        return (
                                            <Grid item key={ind + 'vtgrid'}>
                                                <Paper elevation={1}>
                                                    <Card>
                                                        <CardActionArea>
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="h5">
                                                                    {val.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary"
                                                                            component="p">
                                                                    {val.description}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button size="small" color="primary" onClick={
                                                                (e) => {
                                                                    this.setVoteDialogContent(val)
                                                                    this.setState({
                                                                        selectedVote: val,
                                                                        openVoteDialog: true
                                                                    })
                                                                }
                                                            }
                                                                    disabled={false}>
                                                                Oy kullan
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Paper>
                                            </Grid>
                                        )
                                    }
                                ) :
                                <Grid item>
                                    <Typography color={"textSecondary"} variant={"caption"}>
                                        Bekleyen anket bulunmamaktadır.
                                    </Typography>
                                </Grid>
                        }
                    </Grid>
                    {
                        (this.state.openVoteDialog) ?
                            (<DialogForm
                                title={'Oy Kullanım'}
                                content={this.dialogContent}
                                handleClose={this.handleCloseDialog}
                            />) : <p></p>

                    }
                </Grid>
                <Grid item xs={12} spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={0}>
                            <Typography color={"textPrimary"} variant={"h6"}>
                                Seçim yapılan anketler
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid container justify={"flex-start"} aria-orientation={"horizontal"} spacing={3}>
                        {
                            (this.state.usedVoteList && this.state.usedVoteList.length > 0) ?
                                this.state.usedVoteList.map(
                                    (val, ind) => {
                                        return (
                                            <Grid item key={ind + 'vtgrid'}>
                                                <Paper elevation={1}>
                                                    <Card>
                                                        <CardActionArea>
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="h5">
                                                                    {val.name}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary"
                                                                            component="p">
                                                                    {val.description}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            <Button size="small" color="secondary"
                                                                    onClick={(e) => {
                                                                        this.getVoteResult(val);
                                                                    }}>
                                                                Sonuçları Gör
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Paper>
                                            </Grid>
                                        )
                                    }
                                ) :
                                <Grid item>
                                    <Typography color={"textSecondary"} variant={"caption"}>
                                        Seçim yapılmış aktif anket bulunmamaktadır.
                                    </Typography>
                                </Grid>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify={"center"} aria-orientation={"horizontal"} spacing={3}>
                        <Grid item>
                            <Paper elevation={1}>
                                <Card>
                                    <CardHeader
                                        title={this.state.chartData[0].name}
                                        subheader={'Anket Sonuçları'}
                                    />
                                    <CardActionArea>
                                        <CardContent>
                                            <ChartComponent
                                                dataSource={this.state.chartData}
                                                keyList={this.state.voteResultKeyList}
                                            />
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Paper>
                        </Grid>
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

export default connect(
    mapStateToProps, mapDispatchToProps
)(VotingAndResult);
