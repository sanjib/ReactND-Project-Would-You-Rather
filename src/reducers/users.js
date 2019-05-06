import {
  LOAD_USERS,
  USER_ADDED_QUESTION,
  USER_ANSWERED_QUESTION
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, ...action.users };
    case USER_ADDED_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          questions: [...state[action.authedUser].questions, action.qid]
        }
      };
    case USER_ANSWERED_QUESTION:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      };
    default:
      return state;
  }
}
