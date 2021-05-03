import * as actionTypes from '../actions/types/commonActionTypes';

const initialState = {
  event: null,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EMIT_EVENT: {
      return {
        ...state,
        event: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;
