import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Image,
  Segment,
  Label,
  Progress,
  Button,
  Form,
  Radio
} from "semantic-ui-react";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionView extends Component {
  state = { votedForOption: null };
  handleChange = (e, data) => {
    this.setState({ votedForOption: data.value });
  };

  handleClick = () => {
    if (!this.state.votedForOption) {
      return alert("Please select an option");
    }
    // action
    const qid = this.props.match.params.qid;
    const answer = this.state.votedForOption;
    const { authedUser, handleAnswerQuestion } = this.props;
    handleAnswerQuestion({ authedUser, qid, answer });
  };

  questionResult = () => {
    const qid = this.props.match.params.qid;
    const { authedUser, questions, users } = this.props;

    const question = questions[qid];
    const user = users[question.author];

    const votedForOptionOne = question.optionOne.votes.includes(authedUser);
    const votedForOptionTwo = question.optionTwo.votes.includes(authedUser);
    const voteCountOptionOne = question.optionOne.votes.length;
    const voteCountOptionTwo = question.optionTwo.votes.length;
    const totalVotes = voteCountOptionOne + voteCountOptionTwo;
    const votePercentOptionOne =
      Math.round((voteCountOptionOne / totalVotes) * 10000) / 100;
    const votePercentOptionTwo =
      Math.round((voteCountOptionTwo / totalVotes) * 10000) / 100;

    return (
      <Card key={qid}>
        <Card.Content>
          <Image floated="right" size="mini" src={user.avatarURL} />
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>Would you rather</Card.Meta>
          <Card.Description>
            <Segment>
              {votedForOptionOne && (
                <Label as="a" color="red" ribbon="right">
                  Your Vote
                </Label>
              )}
              <p>{question.optionOne.text}</p>
              <Progress percent={votePercentOptionOne} progress>
                {voteCountOptionOne} out of {totalVotes} votes
              </Progress>
            </Segment>
            <Segment>
              {votedForOptionTwo && (
                <Label color="red" ribbon="right">
                  Your Vote
                </Label>
              )}
              <p>{question.optionTwo.text}</p>
              <Progress percent={votePercentOptionTwo} progress>
                {voteCountOptionTwo} out of {totalVotes} votes
              </Progress>
            </Segment>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };
  questionAnswer = () => {
    const qid = this.props.match.params.qid;
    const { questions, users } = this.props;

    const question = questions[qid];
    const user = users[question.author];

    return (
      <Card key={qid}>
        <Card.Content>
          <Image floated="right" size="mini" src={user.avatarURL} />
          <Card.Header>{user.name}</Card.Header>
          <Card.Meta>Would you rather</Card.Meta>
          <Card.Description>
            <Form>
              <Form.Field>
                <Radio
                  label={question.optionOne.text}
                  name="radioGroupVote"
                  value="optionOne"
                  checked={this.state.votedForOption === "optionOne"}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label={question.optionTwo.text}
                  name="radioGroupVote"
                  value="optionTwo"
                  checked={this.state.votedForOption === "optionTwo"}
                  onChange={this.handleChange}
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
    );
  };

  didAnswer() {
    const { authedUser, questions } = this.props;
    const qid = this.props.match.params.qid;
    return (
      questions[qid].optionOne.votes.includes(authedUser) ||
      questions[qid].optionTwo.votes.includes(authedUser)
    );
  }

  render() {
    let result;
    if (this.didAnswer()) {
      result = this.questionResult();
    } else {
      result = this.questionAnswer();
    }
    return <Card.Group centered>{result}</Card.Group>;
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { handleAnswerQuestion }
)(QuestionView);
