import * as actionTypes from './types/commonActionTypes';

export const emitEvent = (event) => ({
  type: actionTypes.EMIT_EVENT,
  payload: event,
});

export const eventEmmiter = (event) => {
  return (dispatch) => {
    dispatch(emitEvent(event));
    setTimeout(() => {
      dispatch(emitEvent(null));
    }, 3000);
  };
};