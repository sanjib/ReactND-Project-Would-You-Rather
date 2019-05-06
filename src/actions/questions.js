import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { userAddedQuestion, userAnsweredQuestion } from "./users";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function loadQuestions(questions) {
  return { type: LOAD_QUESTIONS, questions };
}

//-- answer question

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return dispatch => {
    dispatch(answerQuestion({ authedUser, qid, answer }));
    dispatch(userAnsweredQuestion({ authedUser, qid, answer }));

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        console.log("saved answer");
      })
      .catch(e => {
        console.warn("Error in handleAnswerQuestion(): ", e);
        dispatch(answerQuestion({ authedUser, qid, answer }));
        alert("There was an error saving the answer.");
      });
  };
}

//-- add question

function addQuestion({ question }) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText, author }) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(userAddedQuestion({ authedUser: author, qid: question.id }));
        return dispatch(addQuestion({ question }));
      }
    );
  };
}
