import { saveQuestionAnswer } from "../utils/api";

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function loadQuestions(questions) {
  return { type: LOAD_QUESTIONS, questions };
}

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

    return saveQuestionAnswer({ authedUser, qid, answer }).catch(e => {
      console.warn("Error in handleAnswerQuestion(): ", e);
      dispatch(answerQuestion({ authedUser, qid, answer }));
      alert("There was an error saving the answer.");
    });
  };
}
