import { useEffect, useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import axios from "axios";

function Create({ setIsChanged }) {
  const [todo, setTodo] = useState();
  const postTodo = () => {
    axios
      .post("http://localhost:3001/todo", { todo: todo })
      .then((result) => console.log("pushed"))
      .catch((err) => console.log(err));
    setIsChanged((prev) => !prev);
  };
  return (
    <div className="App">
      <h1>ToDo Application</h1>
      <div className="todo">
        <input
          type="text"
          placeholder="Enter event"
          className="input"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="addButton" onClick={postTodo}>
          Add
        </button>
      </div>
    </div>
  );
}
function App() {
  const [isChanged, setIsChanged] = useState(false);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/todo")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, [isChanged]);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/todo/" + id)
      .then((result) => console.log("deleted"))
      .catch((err) => console.log(err));
    setIsChanged((prev) => !prev);
  };

  const handleEdit = (id, isDone) => {
    axios
      .put("http://localhost:3001/todo/" + id, { isDone: !isDone })
      .then((result) => console.log("edited"))
      .catch((err) => console.log(err));
    setIsChanged((prev) => !prev);
  };
  return (
    <div>
      <Create setIsChanged={setIsChanged} />
      {todos.map((val) => (
        <div className="main">
          <div
            className="todoItem"
            onClick={(e) => {
              handleEdit(val._id, val.isDone);
            }}
          >
            {!val.isDone ? (
              <>
                <MdCheckBoxOutlineBlank></MdCheckBoxOutlineBlank>
              </>
            ) : (
              <IoIosCheckbox></IoIosCheckbox>
            )}
            <h3
              style={{ textDecoration: val.isDone ? "line-through" : "none" }}
            >
              {val.todo}
            </h3>
          </div>
          <div className="delete" onClick={() => handleDelete(val._id)}>
            <MdDelete size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
