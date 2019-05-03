import { getInitialData } from "../utils/api";
import { loadUsers } from "./users";
import { loadQuestions } from "./questions";

export const handleInitialData = () => dispatch => {
  return getInitialData().then(({ users, questions }) => {
    dispatch(loadUsers(users));
    dispatch(loadQuestions(questions));
  });
};
