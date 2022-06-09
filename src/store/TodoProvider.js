import { useReducer } from "react";

import TodoContext from "./todo-context";

const defaultTodoState = {
  lists: [
    {
      title: "Home List",
      listItems: [],
    },
    {
      title: "School List",
      listItems: [],
    },
  ],
};

const todoReducer = (state, action) => {
  if (action.type === "ADDLIST") {
    const existingLists = state.lists;
    const newLists = [...existingLists, action.list];

    return {
      lists: newLists,
    };
  }
  if (action.type === "ADDITEM") {
    const existingLists = state.lists;
    const itemToAdd = action.item;

    const newList = existingLists.map((list) => {
      let newListItems = [...list.listItems];
      if (list.title === action.list) {
        newListItems = [...list.listItems, itemToAdd];
      }
      return { title: list.title, listItems: newListItems };
    });

    return {
      lists: newList,
    };
  }
  if (action.type === "REMOVEITEM") {
    const existingLists = state.lists;
    const listToUpdate = existingLists.filter((list) => {
      return list.title === action.list;
    });
    const updatedItems = listToUpdate[0].listItems.filter((item) => {
      return item !== action.item;
    });
    const newList = existingLists.map((list) => {
      if (list.title === action.list) {
        list.listItems = updatedItems;
      }
      return list;
    });

    return {
      lists: newList,
    };
  }
};

const TodoProvider = (props) => {
  const [todoState, dispatchTodoState] = useReducer(
    todoReducer,
    defaultTodoState
  );

  const addListHandler = (list) => {
    dispatchTodoState({ type: "ADDLIST", list: list });
  };
  const addItemHandler = (list, item) => {
    dispatchTodoState({ type: "ADDITEM", list: list, item: item });
  };
  const removeItemHandler = (listTitle, item) => {
    dispatchTodoState({ type: "REMOVEITEM", list: listTitle, item: item });
  };

  const todoContext = {
    lists: todoState.lists,
    addList: addListHandler,
    addItemToList: addItemHandler,
    removeItemFromList: removeItemHandler,
  };

  return (
    <TodoContext.Provider value={todoContext}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
