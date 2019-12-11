import { ADD_COUNT, SET_TITLE } from './actionTypes';

export const addCount = count => ({
  type: ADD_COUNT,
  payload: {
    count,
  },
});

export const setTitle = barTitle => ({
  type: SET_TITLE,
  payload: {
    barTitle,
  },
});
