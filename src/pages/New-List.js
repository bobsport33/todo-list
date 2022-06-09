import { Fragment } from "react";
import MainHeader from "../components/layout/MainHeader";
import NewListForm from "../components/list/NewListForm";

const NewList = () => {
  return (
    <Fragment>
      <MainHeader />
      <NewListForm />
    </Fragment>
  );
};

export default NewList;
