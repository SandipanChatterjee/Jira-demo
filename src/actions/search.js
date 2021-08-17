export const actionTypes = {
  SEARCH: "SEARCH",
};

export const search = (data) => {
  return {
    type: actionTypes.SEARCH,
    searchValue: data,
  };
};
