export const LOAD_USERS = "LOAD_USERS";
export const USER_ANSWERED_QUESTION = "USER_ANSWERED_QUESTION";
export const USER_ADDED_QUESTION = "USER_ADDED_QUESTION";

export function loadUsers(users) {
  return { type: LOAD_USERS, users };
}

export function userAddedQuestion({ authedUser, qid }) {
  return { type: USER_ADDED_QUESTION, authedUser, qid };
}

export function userAnsweredQuestion({ authedUser, qid, answer }) {
  return { type: USER_ANSWERED_QUESTION, answer, qid, authedUser };
}
