import React, { Component } from "react";
import { Icon } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <div
        className="ui inverted vertical footer segment"
        style={{ marginTop: "3em", padding: "3em 0" }}
      >
        <div className="ui container smaller" style={{ fontSize: "0.9em" }}>
          <Icon name="smile" /> Would You Rather app created using React, Redux,
          React Router, Semantic UI and friends.
        </div>
      </div>
    );
  }
}

export default Footer;
