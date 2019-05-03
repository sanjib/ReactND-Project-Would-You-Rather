import { getInitialData } from "../utils/api";

export const handleInitialData = () => dispatch => {
  return getInitialData().then(({ users, questions }) => {
    console.log(users, questions);
  });
};
