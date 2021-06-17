import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login.js';
import NavBar from './NavBar.js';
import AllConvos from './ConversationsIndex/AllConvos.js';
import UserProfile from './UserProfile.js';
import SignUp from './SignUp.js';
import MessageConsole from './MessageConsole.js';
import EditUser from './EditUser.js';
import NewConversation from './ConversationComponents/NewConversation.js';
import ConversationThread from './ConversationComponents/ConversationThread.js';
import LastTitleList from './LatestTitleList.js';
import FlaggedReplies from './FlaggedRepliesView.js';
import NotFound from './404Page.js';
import Classifier from './Classifier.js';

import { getUserFromGitHub } from '../redux/users/thunks.js';
import { fetchTags } from '../redux/tags/thunks.js';
import { fetchRepos } from '../redux/repository/thunks.js';

class Root extends Component {
  componentDidMount() {
    this.props
      .getUserFromGitHub()
      .then(() => this.props.fetchRepos(this.props.user.githubUsername));
    this.props.fetchTags();
  }

  componenDidUpdate() {
    this.props.setUser(this.props.user);
  }

  render() {
    return (
      <Router>
        <main>
          <NavBar />
          <MessageConsole />
          <Switch>
            <Route exact path="/" component={AllConvos} />
            <Route path="/userprofile" component={UserProfile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/edituser" component={EditUser} />
            <Route path="/new" component={NewConversation} />
            <Route path="/conversations/:id" component={ConversationThread} />
            <Route path="/last" component={LastTitleList} />
            <Route path="/flagged" component={FlaggedReplies} />
            <Route path='/ml' component={Classifier} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    );
  }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => ({
  getUserFromGitHub: () => dispatch(getUserFromGitHub()),
  fetchTags: () => dispatch(fetchTags()),
  fetchRepos: () => dispatch(fetchRepos()),
});

export default connect(mapState, mapDispatch)(Root);

