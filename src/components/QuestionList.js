import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Image, Label, Menu, Tab } from "semantic-ui-react";

class QuestionList extends Component {
  getCardsFromQuestions = filterLogic => {
    const { questions, users } = this.props;
    const cards = Object.keys(questions)
      .filter(filterLogic)
      .map(id => (
        <Card key={id}>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src={users[questions[id].author].avatarURL}
            />
            <Card.Header>{users[questions[id].author].name}</Card.Header>
            <Card.Meta>{users[questions[id].author].id}</Card.Meta>
            <Card.Description>
              <strong>Would you rather</strong> {questions[id].optionOne.text}{" "}
              or {questions[id].optionTwo.text}?
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="black">
                View Poll
              </Button>
            </div>
          </Card.Content>
        </Card>
      ));

    return [cards.length, <Card.Group itemsPerRow={3}>{cards}</Card.Group>];
  };

  render() {
    const { questions, authedUser } = this.props;
    const [
      unansweredQuestionsCount,
      unansweredQuestionsContent
    ] = this.getCardsFromQuestions(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    );
    const [
      answeredQuestionsCount,
      answeredQuestionsContent
    ] = this.getCardsFromQuestions(
      id =>
        questions[id].optionOne.votes.includes(authedUser) ||
        questions[id].optionTwo.votes.includes(authedUser)
    );
    const panes = [
      {
        menuItem: (
          <Menu.Item key="unanswered-questions">
            Unanswered Questions<Label>{unansweredQuestionsCount}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{unansweredQuestionsContent}</Tab.Pane>
      },
      {
        menuItem: (
          <Menu.Item key="answered-questions">
            Answered Questions<Label>{answeredQuestionsCount}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{answeredQuestionsContent}</Tab.Pane>
      }
    ];

    return (
      <div>
        <div>
          <Tab panes={panes} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    users: state.users,
    authedUser: state.authedUser
  };
};

export default connect(mapStateToProps)(QuestionList);
