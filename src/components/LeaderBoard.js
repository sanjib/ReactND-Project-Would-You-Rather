import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Image, Label, Grid } from "semantic-ui-react";

class Leaderboard extends Component {
  cardItemsPerRow = 3;

  render() {
    const { users } = this.props;
    //const usersForLeaderboard = [];

    const awardColors = ["red", "orange", "yellow"];
    let rank = 0;
    let rankSuffix = ["st", "nd", "rd"];

    const usersWithScore = {};
    Object.keys(users).forEach(uid => {
      const user = users[uid];
      const answeredQuestions = Object.keys(user.answers).length;
      const createdQuestions = user.questions.length;
      user.score = answeredQuestions + createdQuestions;
      usersWithScore[uid] = user;
    });

    const usersWithScoreSorted = {};
    Object.keys(users)
      .map(uid => users[uid])
      .sort((a, b) => b.score - a.score)
      .forEach(user => {
        usersWithScoreSorted[user.id] = user;
      });

    const userCards = Object.keys(usersWithScoreSorted).map(uid => {
      const user = usersWithScoreSorted[uid];
      let label = null;
      let awardColor = awardColors[rank++];
      if (awardColor) {
        label = {
          as: "div",
          corner: "left",
          icon: "trophy",
          color: awardColor
        };
      }
      const answeredQuestions = Object.keys(user.answers).length;
      const createdQuestions = user.questions.length;
      const score = answeredQuestions + createdQuestions;
      return (
        <Card key={uid}>
          <Image src={user.avatarURL} label={label} />
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>
              Rank &nbsp;
              <Label size="tiny">
                {rank}
                {rankSuffix.shift() || "th"}
              </Label>
            </Card.Meta>
            <Card.Description>
              <Grid columns={2} divided style={{ fontSize: "1rem" }}>
                <Grid.Row>
                  <Grid.Column floated="left" width={11}>
                    Answered: {answeredQuestions}
                    <br />
                    Created: {createdQuestions}
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <div>
                      <strong>Score</strong>
                    </div>
                    <Label circular color={awardColor} size="large">
                      {score}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
    return (
      <Card.Group itemsPerRow={this.cardItemsPerRow}>{userCards}</Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Leaderboard);
