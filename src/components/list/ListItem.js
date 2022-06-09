import classes from "./ListItem.module.css";

const ListItem = (props) => {
  const removeItemHandler = () => {
    document.getElementById(props.text).click();
    props.onRemove();
  };

  return (
    <li className={classes["list-item"]}>
      <input id={props.text} type="checkbox" onClick={removeItemHandler} />
      <p>{props.text}</p>
      <p className={props.dueDate === "PAST DUE" ? classes.alert : ""}>
        {props.dueDate}
      </p>
      <p>{props.priority}</p>
    </li>
  );
};

export default ListItem;
