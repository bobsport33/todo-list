import { Link } from "react-router-dom";

import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <h1 className={classes.title}>To-Do Tracker</h1>
        <ul className={classes.links}>
          <li>
            <Link className={classes.link} to="/">
              Lists
            </Link>
          </li>
          <li>
            <Link className={classes.link} to="/new-list">
              Add New List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
