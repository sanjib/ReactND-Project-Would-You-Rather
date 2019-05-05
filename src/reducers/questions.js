import {
  LOAD_QUESTIONS,
  ANSWER_QUESTION,
  ADD_QUESTION
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return { ...state, ...action.questions };
    case ANSWER_QUESTION:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authedUser]
          }
        }
      };
    case ADD_QUESTION:
      const { question } = action;
      return { ...state, [question.id]: question };
    default:
      return state;
  }
}
