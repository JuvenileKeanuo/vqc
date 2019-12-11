import { SET_TITLE } from '../actionTypes';

const initialState = {
  barTitle: 'VQC建模',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      const { barTitle } = action.payload;
      return {
        ...state,
        barTitle,
      };
    default:
      return state;
  }
}
