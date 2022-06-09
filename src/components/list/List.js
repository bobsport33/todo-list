import { useContext, useState, useRef, Fragment } from "react";

import classes from "./List.module.css";
import Card from "../ui/Card";
import ListItem from "./ListItem";
import TodoContext from "../../store/todo-context";

const List = (props) => {
  const [displayAddItem, setDisplayAddItem] = useState(false);
  const todoCtx = useContext(TodoContext);
  const textRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();
  const [canAdd, setCanAdd] = useState(false);
  const [addFailed, setAddFailed] = useState(false);

  const addFormHandler = (event) => {
    console.log(event.target.value);
    setDisplayAddItem(true);
  };

  const removeItemHandler = (listTitle, item) => {
    todoCtx.removeItemFromList(listTitle, item);
  };

  const addItemHandler = (event) => {
    event.preventDefault();
    if (
      textRef.current.value !== "" &&
      dateRef.current.value !== null &&
      priorityRef.current.value !== ""
    ) {
      setCanAdd(true);
    } else {
      setAddFailed(true);
    }
    if (canAdd) {
      setAddFailed(false);
      const newItem = {
        key: textRef.current.value,
        text: textRef.current.value,
        dueDate: dateRef.current.value,
        priority: priorityRef.current.value,
      };

      todoCtx.addItemToList(props.list.title, newItem);
      setDisplayAddItem(false);
    }
  };

  return (
    <Card>
      <h4 className={classes["list-title"]}>{props.list.title}</h4>
      <ul>
        {props.list.listItems.map((item) => {
          const [year, month, day] = item.dueDate.split("-");

          const dueDateArray = new Date(`${month}/${day}/${year}`)
            .toLocaleDateString()
            .split("/");
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const todayArray = today.toLocaleDateString().split("/");
          const newTodayArray = todayArray.map((item) => {
            return ("0" + item).slice(-2);
          });
          const todayComparison = newTodayArray.join("/");

          const newDueDateArray = dueDateArray.map((item) => {
            return ("0" + item).slice(-2);
          });
          const dueDate = newDueDateArray.join("/");

          let date;
          if (dueDate === todayComparison) {
            date = "Today";
          } else if (dueDate < todayComparison) {
            date = "PAST DUE";
          } else {
            date = `${month}/${day}`;
          }

          return (
            <ListItem
              key={Math.random()}
              text={item.text}
              dueDate={date}
              priority={item.priority}
              onRemove={removeItemHandler.bind(null, props.list.title, item)}
              // Cannot set item to be removed by title, it will remove all with the same title. Need to figrue out how to do it by key or something
            />
          );
        })}
      </ul>
      {displayAddItem && (
        <Fragment>
          <form onSubmit={addItemHandler} className={classes["add-form"]}>
            <button className={classes.btn} type="submit">
              Add
            </button>
            <input
              ref={textRef}
              className={classes.input}
              id="text"
              type="text"
            ></input>
            <input
              ref={dateRef}
              className={classes.input}
              id="dueDate"
              type="date"
            ></input>
            <select
              className={classes.input}
              id="priority"
              type="text"
              ref={priorityRef}
            >
              <option></option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </form>
          {addFailed && (
            <p className={classes.alertText}>All fields must be filled in!</p>
          )}
        </Fragment>
      )}
      <button className={classes.button} onClick={addFormHandler}>
        +
      </button>
    </Card>
  );
};

export default List;
