import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = { selectedUser: null };

  handleUserSelection = (event, data) => {
    this.setState({ selectedUser: data.value });
  };

  handleUserLogin = () => {
    if (!this.state.selectedUser) {
      return alert("Please select a user to login");
    }
    this.props.setAuthedUser(this.state.selectedUser);
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }

    const userOptions = Object.keys(users).map(userId => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL }
    }));

    return (
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ width: "420px", marginTop: "5em" }}>
            <h2 className="ui black image header">
              <img src="/would-you-rather.png" className="ui image" alt="" />
              <div className="content">Log-in to your account</div>
            </h2>
            <form className="ui large form">
              <div className="ui raised segment">
                <div className="field">
                  <Dropdown
                    placeholder="Select a User"
                    fluid
                    selection
                    options={userOptions}
                    onChange={this.handleUserSelection}
                  />
                </div>
                <div className="field">
                  Select a user from above and click the login button.
                  <br />
                  This is a demo app and doesn't require a password.
                </div>
                <div
                  className="ui fluid black submit button"
                  onClick={this.handleUserLogin}
                >
                  Login
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Login);
