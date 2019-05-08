import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";

import Menu from "./Menu";
import Footer from "./Footer";

import QuestionList from "./QuestionList";
import QuestionNew from "./QuestionNew";
import QuestionView from "./QuestionView";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import Logout from "./Logout";
import PageNotFound from "./PageNotFound";

class App extends Component {
  // remember the current tab: unanswered or answered questions
  state = { activeIndex: 0 };

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex });
  };

  resetActiveIndexToZero = () => {
    // resets active tab index to zero (unanswered questions)
    // used after creating a new question
    this.setState({ activeIndex: 0 });
  };

  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar style={{ zIndex: 1000 }} />
          <Menu />
          <div className="ui main text container" style={{ marginTop: "7em" }}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return (
                    <QuestionList
                      handleTabChange={this.handleTabChange}
                      activeIndex={this.state.activeIndex}
                    />
                  );
                }}
              />
              <Route
                path="/add"
                render={history => {
                  return (
                    <QuestionNew
                      resetActiveIndexToZero={this.resetActiveIndexToZero}
                      history={history.history}
                    />
                  );
                }}
              />
              <Route path="/questions/:question_id" component={QuestionView} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/logout" component={Logout} />
              <Route path="/404" component={PageNotFound} />
              <Route path="/" component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  const { authedUser } = state;
  return { authedUser };
};

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
