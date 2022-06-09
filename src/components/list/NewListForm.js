import classes from "./NewListForm.module.css";
import Card from "../ui/Card";
import { useContext, useRef, useState } from "react";
import TodoContext from "../../store/todo-context";
import { useNavigate } from "react-router-dom";

const NewListForm = (props) => {
  const [canSumbit, setCanSubmit] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);
  const todoCtx = useContext(TodoContext);
  const titleInputRef = useRef();
  const taskInputRef = useRef();
  const dateInputRef = useRef();
  const priorityInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      titleInputRef.current.value !== null &&
      taskInputRef.current.value !== null &&
      dateInputRef.current.value !== null &&
      priorityInputRef.current.value !== ""
    ) {
      setCanSubmit(true);
    }

    if (canSumbit) {
      todoCtx.addList({
        title: titleInputRef.current.value,
        listItems: [
          {
            text: taskInputRef.current.value,
            dueDate: dateInputRef.current.value,
            priority: priorityInputRef.current.value,
          },
        ],
      });
      navigate("/");
    } else {
      setSubmitFailed(true);
    }
  };

  return (
    <div className={classes.display}>
      <Card>
        <h4 className={classes["list-header"]}>Add a new List</h4>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes["new-title"]}>
            <label className={classes.label} htmlFor="new-list">
              New List Title
            </label>
            <input
              className={classes.input}
              id="new-list"
              type="text"
              ref={titleInputRef}
            />
          </div>
          <label className={classes.label} htmlFor="new-item">
            New List Item
          </label>
          <div className={classes["new-item"]} id="new-item">
            <label className={classes.label} htmlFor="task">
              Task
            </label>
            <input
              className={classes.input}
              id="task"
              type="text"
              ref={taskInputRef}
            ></input>
            <label className={classes.label} htmlFor="dueDate">
              Due Date
            </label>
            <input
              className={classes.input}
              id="dueDate"
              type="date"
              ref={dateInputRef}
            ></input>
            <label className={classes.label} htmlFor="priority">
              Priority
            </label>
            <select
              className={classes.input}
              id="priority"
              type="text"
              ref={priorityInputRef}
            >
              <option></option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button className={classes.btn} type="submit">
            Add New List
          </button>
          {submitFailed && <p>All fields must be entered!</p>}
        </form>
      </Card>
    </div>
  );
};

export default NewListForm;
