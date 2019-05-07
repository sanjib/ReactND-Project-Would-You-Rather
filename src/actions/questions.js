import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { userAddedQuestion, userAnsweredQuestion } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";

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
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(answerQuestion({ authedUser, qid, answer }));
      dispatch(userAnsweredQuestion({ authedUser, qid, answer }));
      dispatch(hideLoading());
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
    dispatch(showLoading());

    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(userAddedQuestion({ authedUser: author, qid: question.id }));
        dispatch(addQuestion({ question }));
        dispatch(hideLoading());
      }
    );
  };
}
