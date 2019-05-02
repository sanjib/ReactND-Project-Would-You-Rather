import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Menu from "./Menu";
import Footer from "./Footer";

import QuestionList from "./QuestionList";
import QuestionNew from "./QuestionNew";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Menu />
          <div className="ui main text container" style={{ marginTop: "7em" }}>
            <Switch>
              <Route path="/" exact component={QuestionList} />
              <Route path="/new-question" component={QuestionNew} />
              <Route path="/leader-board" component={LeaderBoard} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
