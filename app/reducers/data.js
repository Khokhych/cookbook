const initialState = [];

export default function data(state = initialState, action) {
  if (action.type === 'ADD_CART') {
    return [...state, ...action.payload];
  }
  if (action.type === 'ADD_DATA') {
    return [...state, ...action.payload];
  }
  if (action.type === 'ADD_VERSION') {
    const index = state.findIndex((e) => e._id === action.payload.id);
    const stateN = [...state];
    stateN[index].versions.push(action.payload.value);
    return stateN;
  }
  return state;
}