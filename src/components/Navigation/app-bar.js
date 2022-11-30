//#region imports
import React, {useState} from "react";
//import { Route } from "react-router";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {alpha, makeStyles, useTheme} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as pageActions from "../../redux/actions/page-actions";
import {GetActiveLocalUser} from "../../Core/Helper";
import Cache from "../../Services/Cache";
import GetIcon from "../Utils/iconHelper";
import {CommonTypes} from "../../Types/Common";
import {DevicePageClaims, HotelPageClaims, UserPageClaims} from "../../Models/OperationClaim";
import * as loginActions from "../../redux/actions/login-actions";

//#endregion
let drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
}));

/**
 * uygulama çerçevesini oluşturur.
 * @param props
 * @returns {*}
 * @constructor
 */
function AppBarMenu(props) {
    const classes = useStyles();

    //initial user

    let tmpusr = GetActiveLocalUser();
    console.log("app-bar kullanıcı = ", tmpusr);

    let cacheResources = Cache.getItem("resources");
    console.log("kaynak listesi (cache) = ", cacheResources);

    //drawer
    const theme = useTheme();
    const [openMenu, setOpenMenu] = useState(false);

    const handleDrawerOpen = () => {
        setOpenMenu(true);
    };

    const handleDrawerClose = () => {
        setOpenMenu(false);
    };

    const logOut = () => {
        props.actions.logout();
        Cache.overrideItem('user-claims', []);
        props.actions.changeActiveResourceCode('');
    }
    //#region handles

    //#endregion

    //#region renders

    //#endregion

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openMenu,
                })}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={clsx(classes.menuButton, openMenu && classes.hide)}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h5" noWrap>
                        ARTES CLOUD
                    </Typography>
                    <div className={classes.grow}/>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openMenu}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon/>
                        ) : (
                            <ChevronRightIcon/>
                        )}
                    </IconButton>
                </div>
                <Divider/>
                <Accordion>
                    <AccordionDetails>
                        <List>
                            <ListItem button component={Link} to={"/"}>
                                <ListItemIcon>{GetIcon(CommonTypes.Iconkeys.home)}</ListItemIcon>
                                <ListItemText primary={"Home"}/>
                            </ListItem>
                            {props.userContract?.claims && props.userContract.claims.length &&
                                (
                                    <React.Fragment>
                                        {props.userContract.claims.find(c => HotelPageClaims.includes(c)) &&
                                            (<ListItem button component={Link} to={"/Hotel"}>
                                                <ListItemIcon>{GetIcon(CommonTypes.Iconkeys.apartment)}</ListItemIcon>
                                                <ListItemText primary={"Hotel"}/>
                                            </ListItem>)
                                        }
                                        {
                                            props.userContract.claims.find(c => DevicePageClaims.includes(c)) &&
                                            (
                                                <ListItem button component={Link} to={"/device"}>
                                                    <ListItemIcon>{GetIcon(CommonTypes.Iconkeys.paydue)}</ListItemIcon>
                                                    <ListItemText primary={"Device"}/>
                                                </ListItem>
                                            )
                                        }
                                        {
                                            props.userContract.claims.find(c => UserPageClaims.includes(c)) &&
                                            <ListItem button component={Link} to={"/user"}>
                                                <ListItemIcon>{GetIcon(CommonTypes.Iconkeys.profile)}</ListItemIcon>
                                                <ListItemText primary={"User"}/>
                                            </ListItem>
                                        }
                                    </React.Fragment>
                                )
                            }
                            <ListItem button component={Link} to={"/"} onClick={() => {
                                logOut()
                            }}>
                                <ListItemIcon>{GetIcon(CommonTypes.Iconkeys.logout)}</ListItemIcon>
                                <ListItemText primary={"Logout"}/>
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: openMenu,
                })}
            >
                <div className={classes.drawerHeader}/>
                {props.children}
            </main>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        userContract: state.loginReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            changeBackdropStatus: bindActionCreators(
                pageActions.changeBackDropStatus,
                dispatch
            ),
            logout: bindActionCreators(
                loginActions.Logout,
                dispatch
            ),
            changeActiveResourceCode: bindActionCreators(
                pageActions.changeActiveResourceCode,
                dispatch
            ),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarMenu);
