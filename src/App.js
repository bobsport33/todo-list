import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewList from "./pages/New-List";
import TodoProvider from "./store/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/new-list" element={<NewList />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
