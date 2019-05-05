import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { loadUsers } from "./users";
import { loadQuestions } from "./questions";

export const handleInitialData = () => dispatch => {
  return getInitialData().then(({ users, questions }) => {
    dispatch(loadUsers(users));
    dispatch(loadQuestions(questions));

    // auto-login for debugging
    dispatch(setAuthedUser("sarahedo"));
  });
};
