export const actionTypes = {
  users: "users",
};

export const setUsers = (data) => {
  return {
    type: actionTypes.users,
    users: data,
  };
};
