import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Segment, Label, Progress } from "semantic-ui-react";

class QuestionView extends Component {
  questionResult = () => {
    const id = this.props.match.params.id;
    const { authedUser, questions, users } = this.props;

    const question = questions[id];
    const user = users[question.author];

    const votedForOptionOne = question.optionOne.votes.includes(authedUser);
    const votedForOptionTwo = question.optionTwo.votes.includes(authedUser);

    const voteCountOptionOne = question.optionOne.votes.length;
    const voteCountOptionTwo = question.optionTwo.votes.length;
    const totalVotes = voteCountOptionOne + voteCountOptionTwo;
    const votePercentOptionOne =
      Math.floor((voteCountOptionOne / totalVotes) * 10000) / 100;
    const votePercentOptionTwo =
      Math.floor((voteCountOptionTwo / totalVotes) * 10000) / 100;

    return (
      <Card key={id}>
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
                <Label as="a" color="red" ribbon="right">
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
  questionVote = () => {
    const id = this.props.match.params.id;
    return "vote";
  };

  didAnswer() {
    const { authedUser, questions } = this.props;
    const id = this.props.match.params.id;
    return (
      questions[id].optionOne.votes.includes(authedUser) ||
      questions[id].optionTwo.votes.includes(authedUser)
    );
  }

  render() {
    let result;
    if (this.didAnswer()) {
      result = this.questionResult();
    } else {
      result = this.questionVote();
    }

    return <div>{result}</div>;
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
    users: state.users
  };
};

export default connect(mapStateToProps)(QuestionView);
