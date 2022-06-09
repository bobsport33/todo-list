import React from "react";

const TodoContext = React.createContext({
  lists: [],
  addList: () => {},
  addItemToList: (listTitle, item) => {},
  removeItemFromList: (list, item) => {},
});

export default TodoContext;
