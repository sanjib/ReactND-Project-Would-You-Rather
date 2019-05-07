import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

class Menu extends Component {
  render() {
    const { users, authedUser } = this.props;
    const { name, avatarURL } = users[authedUser];

    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <NavLink
            to="/"
            exact
            className="header item"
            activeClassName="active"
          >
            <Icon name="smile" size="big" />
            Home
          </NavLink>
          <NavLink
            to="/new-question"
            exact
            className="item"
            activeClassName="active"
          >
            New Question
          </NavLink>
          <NavLink
            to="/leader-board"
            exact
            className="item"
            activeClassName="active"
          >
            Leader Board
          </NavLink>
          <div className="ui right floated item">
            <span style={{ marginRight: "10px" }}>Hello, {name}</span>
            <img className="ui avatar image" src={avatarURL} alt="" />
          </div>
          <NavLink to="/logout" exact className="item" activeClassName="active">
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authedUser: state.authedUser, users: state.users };
};

export default connect(mapStateToProps)(Menu);
