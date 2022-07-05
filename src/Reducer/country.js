export function country(state = null, action) {
  switch (action.type) {
    case "VISIT":
      return action.payload;
    default:
      return state;
  }
}
