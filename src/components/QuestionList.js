import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Image, Label, Menu, Tab } from "semantic-ui-react";

class QuestionList extends Component {
  cardItemsPerRow = 3;

  getCardsFromQuestions = filterLogic => {
    const { questions, users } = this.props;
    const cards = Object.keys(questions)
      .filter(filterLogic)
      .map(id => {
        const question = questions[id];
        const user = users[question.author];
        return (
          <Card key={id}>
            <Card.Content>
              <Image floated="right" size="mini" src={user.avatarURL} />
              <Card.Header>{user.name}</Card.Header>
              <Card.Meta>Would you rather</Card.Meta>
              <Card.Description>
                {question.optionOne.text} or {question.optionTwo.text}?
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui buttons">
                <Link to={`/view-question/${id}`}>
                  <Button basic color="black">
                    View Poll
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        );
      });

    return [
      cards.length,
      <Card.Group itemsPerRow={this.cardItemsPerRow}>{cards}</Card.Group>
    ];
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
