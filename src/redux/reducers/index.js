// IMPORT ALL CONSTANT STRINGS DEFINED IN action file == ../actions/Camp.js
import { USER_DATA, USER_TOKEN } from '../actions/index';
import { CALCULATION } from '../actions/index'

const initialState = {
  userData: {},
  calculation: '0',
  userToken: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case CALCULATION:
      return {
        ...state,
        calculation: action.payload,
      };

    default:
      return state;
  }
};
export default Reducer;
