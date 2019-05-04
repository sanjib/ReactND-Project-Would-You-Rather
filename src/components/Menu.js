import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <NavLink
            to="/"
            exact
            className="header item"
            activeClassName="active"
          >
            <img
              className="ui image"
              src="/would-you-rather.png"
              alt=""
              style={{ marginRight: "0.5em", width: "50px" }}
            />
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
          <NavLink
            to="/logout"
            exact
            className="ui right floated item"
            activeClassName="active"
          >
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Menu;
