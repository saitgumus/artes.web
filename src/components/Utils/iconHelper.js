import InboxIcon from "@material-ui/icons/MoveToInbox";
import ViewListRoundedIcon from "@material-ui/icons/ViewListRounded";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HowToVoteRoundedIcon from "@material-ui/icons/HowToVoteRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import AddBox from "@material-ui/icons/AddBoxRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded"; // ihale listele
//import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded"; //aidat ödeme
import ThumbsUpDownRoundedIcon from "@material-ui/icons/ThumbsUpDownRounded";
import ProfileIcon from "@material-ui/icons/AccountBoxRounded";
import ApartmentRoundedIcon from "@material-ui/icons/ApartmentRounded";
import PaymentIcon from "@material-ui/icons/Payment";

import { CommonTypes } from "../../Types/Common";
import React from "react";

export default function GetIcon(iconKey) {
  switch (iconKey) {
    case CommonTypes.Iconkeys.inbox:
      return <InboxIcon />;
    case CommonTypes.Iconkeys.viewlist:
      return <ViewListRoundedIcon />;
    case CommonTypes.Iconkeys.personadd:
      return <PersonAddIcon />;
    case CommonTypes.Iconkeys.howtovote:
      return <HowToVoteRoundedIcon />;
    case CommonTypes.Iconkeys.home:
      return <HomeIcon />;
    case CommonTypes.Iconkeys.addChart:
      return <AddBox />;
    case CommonTypes.Iconkeys.listChart:
      return <ListAltRoundedIcon />;
    case CommonTypes.Iconkeys.paydue:
      return <PaymentIcon />;
    case CommonTypes.Iconkeys.updown:
      return <ThumbsUpDownRoundedIcon />;
    case CommonTypes.Iconkeys.profile:
      return <ProfileIcon />;
    case CommonTypes.Iconkeys.apartment:
      return <ApartmentRoundedIcon />;
    default:
      return <InboxIcon />;
  }
}
