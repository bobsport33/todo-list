import List from "./List";
import classes from "./ListDisplay.module.css";

const ListDisplay = (props) => {
  return (
    <div className={classes.lists}>
      {props.list.map((list) => {
        return <List key={list.title} list={list} />;
      })}
    </div>
  );
};

export default ListDisplay;
