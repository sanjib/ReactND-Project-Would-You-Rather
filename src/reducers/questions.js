import { LOAD_QUESTIONS } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return { ...state, ...action.questions };
    default:
      return state;
  }
}
