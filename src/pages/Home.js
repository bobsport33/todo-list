import { useContext } from "react";

import MainHeader from "../components/layout/MainHeader";
import ListDisplay from "../components/list/ListDisplay";
import TodoContext from "../store/todo-context";

const Home = () => {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.lists;
  return (
    <div>
      <MainHeader />
      <ListDisplay list={todoList} />
    </div>
  );
};

export default Home;
