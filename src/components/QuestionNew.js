import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Form, Image, Input } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class QuestionNew extends Component {
  state = { optionOne: "", optionTwo: "" };

  handleOnChange = (e, data) => {
    this.setState({ [data.id]: data.value.trim() });
  };

  handleClick = async () => {
    const { optionOne: optionOneText, optionTwo: optionTwoText } = this.state;
    const { authedUser: author, history } = this.props;

    if (!optionOneText || !optionTwoText) {
      return alert("Please enter both options");
    }
    const success = await this.props.handleAddQuestion({
      optionOneText,
      optionTwoText,
      author
    });
    if (success) {
      console.log("redirect");
      history.push("/");
    }
  };

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];

    return (
      <Card.Group centered>
        <Card>
          <Card.Content>
            <Image floated="right" size="mini" src={user.avatarURL} />
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>Would you rather</Card.Meta>
            <Card.Description>
              <Form>
                <Form.Field>
                  <Input
                    size="mini"
                    id="optionOne"
                    placeholder="Enter Option One Text Here"
                    value={this.state.optionOne}
                    onChange={this.handleOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    size="mini"
                    id="optionTwo"
                    placeholder="Enter Option One Text Here"
                    value={this.state.optionTwo}
                    onChange={this.handleOnChange}
                  />
                </Form.Field>
              </Form>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="black" onClick={this.handleClick}>
                Submit
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users, authedUser: state.authedUser };
};

export default connect(
  mapStateToProps,
  { handleAddQuestion }
)(QuestionNew);
