import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Image, Label, Menu, Tab } from "semantic-ui-react";

class QuestionList extends Component {
  cardItemsPerRow = 2;

  getCardsFromQuestions = filterLogic => {
    const { questions, users } = this.props;
    const cards = Object.keys(questions)
      .filter(filterLogic)
      .map(qid => {
        const question = questions[qid];
        const user = users[question.author];
        return (
          <Card key={qid}>
            <Card.Content>
              <Image floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>
                Would you rather {question.optionOne.text} or{" "}
                {question.optionTwo.text}?
              </div>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                  <Button fluid basic color="black">
                    View Poll
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        );
      });

    return cards.length
      ? [
          cards.length,
          <Card.Group itemsPerRow={this.cardItemsPerRow}>{cards}</Card.Group>
        ]
      : [cards.length];
  };

  render() {
    const { questions, authedUser, activeIndex, handleTabChange } = this.props;

    const [
      unansweredQuestionsCount,
      unansweredQuestionsContent = "All questions have been answered."
    ] = this.getCardsFromQuestions(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    );

    const [
      answeredQuestionsCount,
      answeredQuestionsContent = "There are no answered questions available."
    ] = this.getCardsFromQuestions(
      qid =>
        questions[qid].optionOne.votes.includes(authedUser) ||
        questions[qid].optionTwo.votes.includes(authedUser)
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
          <Tab
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
        </div>
      </div>
    );
  }
}

const sortQuestionsByTimeStamp = questions => {
  const questionsSorted = {};
  Object.keys(questions)
    .map(key => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach(question => {
      questionsSorted[question.id] = question;
    });
  return questionsSorted;
};

const mapStateToProps = state => {
  // todo state.questions transform to array, order by timestamp
  return {
    questions: sortQuestionsByTimeStamp(state.questions),
    users: state.users,
    authedUser: state.authedUser
  };
};

export default connect(mapStateToProps)(QuestionList);
