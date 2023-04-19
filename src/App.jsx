import { useState } from "react";
import ListItem from "./components/ListItem";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import "./App.css";

function App() {
  const [list, setList] = useState([
    { type: "string", value: "", required: false, list: [] },
    { type: "number", value: "", required: false, list: [] },
    { type: "boolean", value: "", required: false, list: [] },
    {
      type: "object",
      value: "",
      required: false,
      list: [
        { type: "string", value: "", required: false, list: [] },
        { type: "number", value: "", required: false, list: [] },
        { type: "boolean", value: "", required: false, list: [] },
      ],
    },
  ]);

  const getObject = (obj, path) => {
    let tmp = obj;
    for (let val of path) tmp = tmp[val];
    return tmp;
  };

  const handleAdd = (path) => {
    let newList = [...list];

    if (path.length) {
      let tmp = getObject(newList, path);
      tmp.list.push({ type: "string", value: "", required: false, list: [] });
    } else {
      newList.push({ type: "string", value: "", required: false, list: [] });
    }

    setList(newList);
  };

  const handleDelte = (path) => {
    let newList = [...list];

    let tmp = newList;
    for (let i = 0; i < path.length - 1; i++) tmp = tmp[path[i]];
    tmp.splice(path.at(-1), 1);

    setList(newList);
  };

  const handleRequiredChange = (path, newValue) => {
    let newList = [...list];

    let tmp = getObject(newList, path);
    tmp.required = newValue;

    setList(newList);
  };

  const handleSelectChange = (path, newValue) => {
    let newList = [...list];

    let tmp = getObject(newList, path);
    tmp.type = newValue;

    setList(newList);
  };

  const handleInputChange = (path, newValue) => {
    let newList = [...list];

    let tmp = getObject(newList, path);
    tmp.value = newValue;

    setList(newList);
  };

  return (
    <div className="wrapper p-4">
      <div className="App">
        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <p>Field name and type</p>
            <Button
              onClick={() => handleAdd([])}
              size="sm"
              variant="outline-dark"
            >
              <Plus />
            </Button>
          </div>
          <div>
            {list.map((val, i) => (
              <ListItem
                val={val}
                path={[i]}
                handleAdd={handleAdd}
                handleDelte={handleDelte}
                handleRequiredChange={handleRequiredChange}
                handleSelectChange={handleSelectChange}
                handleInputChange={handleInputChange}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="text-end mt-4">
        <Button variant="success" size="sm" onClick={() => console.log(list)}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default App;
