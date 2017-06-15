import { ADD_LIST_ITEM, REMOVE_LIST_ITEM, TOGGLE_DONE_LIST_ITEM, EDIT_LIST_ITEM } from '../actions/index';
import { generateId } from '../actions/index';

const initData = [
  { title: 'first', id: generateId(), isDone: false },
  { title: 'second', id: generateId(), isDone: false },
  { title: 'third', id: generateId(), isDone: false },
];


export default function listReducer(state = initData, action) {
  switch (action.type) {
    case ADD_LIST_ITEM:
      return [...state, action.payload];
    case REMOVE_LIST_ITEM:
      return [...state].filter(elem => (
        elem.id !== action.payload.id
      ));
    case TOGGLE_DONE_LIST_ITEM:
      return [...state].map((elem) => {
        if (elem.id === action.payload.id) {
          return Object.assign({}, elem, { isDone: !elem.isDone });
        }
        return elem;
      });
    case EDIT_LIST_ITEM:
      return [...state].map((elem) => {
        if (elem.id === action.payload.id) {
          return Object.assign({}, elem, { title: action.payload.title });
        }
        return elem;
      });
    default:
      return state;
  }
}
