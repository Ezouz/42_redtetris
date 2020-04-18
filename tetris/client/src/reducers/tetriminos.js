const reducer = (
  state = { tetriminos: [{ shape: [[0]], color: "220, 220, 220" }] },
  action
) => {
  switch (action.type) {
    case "REFILL":
      return {
        ...state,
        tetriminos: action.tetriminos
      };
    default:
      return state;
  }
};

export default reducer;