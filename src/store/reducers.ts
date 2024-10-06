import { User } from '@/types';
import { SET_USER, CLEAR_USER, UPDATE_USER } from './actions';

const initialState: User | null = null;

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return null;
    case UPDATE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
