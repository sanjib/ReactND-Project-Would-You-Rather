import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div
        className="ui inverted vertical footer segment"
        style={{ marginTop: "3em", padding: "3em 0" }}
      >
        <div className="ui container smaller" style={{ fontSize: "0.9em" }}>
          <strong>Would You Rather</strong> app created using React, Redux,
          React Router, Semantic UI and friends.
          <br />
          Logo from freepik.com.
        </div>
      </div>
    );
  }
}

export default Footer;
