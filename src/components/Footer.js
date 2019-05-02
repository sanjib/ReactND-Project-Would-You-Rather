import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div
        className="ui inverted vertical footer segment"
        style={{ marginTop: "3em", padding: "3em 0" }}
      >
        <div className="ui container">
          <strong>Would You Rather</strong> app created using React, Redux,
          Semantic UI and friends.
        </div>
      </div>
    );
  }
}

export default Footer;
