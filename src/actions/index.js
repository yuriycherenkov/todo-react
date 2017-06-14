export const ADD_LIST_ITEM = 'ADD_LIST_ITEM';
export const REMOVE_LIST_ITEM = 'REMOVE_LIST_ITEM';
export const EDIT_LIST_ITEM = 'EDIT_LIST_ITEM';

export function generateId() {
  return parseInt((Math.random() * 10000), 10);
}

export function addListItem(title) {
  return {
    type: ADD_LIST_ITEM,
    payload: {
      title,
      isDone: false,
      id: generateId(),
    },
  };
}

export function removeListItem(id) {
  return {
    type: REMOVE_LIST_ITEM,
    payload: {
      id,
    },
  };
}

export function toggleListItemDone(id) {
  return {
    type: EDIT_LIST_ITEM,
    payload: {
      id,
    },
  };
}
