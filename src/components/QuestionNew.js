import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Form, Image, Input, Message } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/questions";

class QuestionNew extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    message: { hidden: true, content: "" }
  };

  handleOnChange = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  handleClick = async () => {
    const { optionOne: optionOneText, optionTwo: optionTwoText } = this.state;
    const { authedUser: author, history } = this.props;

    if (!optionOneText || !optionTwoText) {
      this.setState({
        message: {
          hidden: false,
          content: "Please enter both Option One Text and Option Two Text"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      });
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
      <div>
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
                  <Message hidden={this.state.message.hidden} negative>
                    {this.state.message.content}
                  </Message>
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
      </div>
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
