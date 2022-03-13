import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Distributor from "./components/Distributor";
import DefineSiteApartment from "./components/Admin/SiteApartment/DefineSiteApartment";
import MemberDefine from "./components/Admin/Member/member-define";
import MemberList from "./components/Admin/Member/member-list";
import UserProfile from "./components/User/user-profile";
import InboxComponent from "./components/User/Inbox";
import VoteDefining from "./components/Vote/VoteDefining";
import VotingAndResult from "./components/Vote/VotingAndResult";
import ExpenseEntry from "./components/Accounting/expense-entry";
import ExpenseList from "./components/Accounting/expense-list";
import TenderDefining from "./components/Tender/tender-defining-component";
import TenderList from "./components/Tender/tender-list-component";
import DuesPayment from "./components/Accounting/dues-payment";
import DuesListing from "./components/Accounting/dues-listing";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/distributor" component={Distributor} />
          <Route
            path="/admin/definesiteapartment"
            component={DefineSiteApartment}
          />
          <Route path="/admin/definemember" component={MemberDefine} />
          <Route path="/admin/votedefining" component={VoteDefining} />
          <Route path="/admin/memberlist" component={MemberList} />
          <Route path="/user/profile" component={UserProfile} />
          <Route path="/user/inbox" component={InboxComponent} />
          <Route path="/vote/votingandresult" component={VotingAndResult} />
          <Route path="/accounting/expense-entry" component={ExpenseEntry} />
          <Route path="/accounting/expense-list" component={ExpenseList} />
          <Route path="/tender/tenderdefining" component={TenderDefining} />
          <Route path="/tender/tenderlist" component={TenderList} />
          <Route path="/accounting/dues-payment" component={DuesPayment} />
          <Route path="/accounting/dues-listing" component={DuesListing} />
        </Switch>
      </Layout>
    );
  }
}
