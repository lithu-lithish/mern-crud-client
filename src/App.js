import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [list, setList] = useState([]);

  // local connection: http://localhost:3001

  const send = () => {
    Axios.post("https://mern-web-appliaction-crud-litu.herokuapp.com/insert", {
      name: name,
      age: age,
    }).then((response) => {
      setList([...list, { _id: response.data._id, name: name, age: age }]);
      alert("yesshhhh!! it worked.");
      alert("name: " + name + " " + "\nage: " + age);
    });
  };

  const update = (_id) => {
    const newName = prompt("enter the new name");
    const newAge = prompt("enter the new age");
    Axios.put("https://mern-web-appliaction-crud-litu.herokuapp.com/update", {
      newAge: newAge,
      _id: _id,
      newName: newName,
    }).then(() => {
      setList(
        list.map((val) => {
          return val._id == _id
            ? { _id: _id, name: newName, age: newAge }
            : val;
        })
      );
    });
  };

  const del = (_id) => {
    Axios.delete(
      `https://mern-web-appliaction-crud-litu.herokuapp.com/delete/${_id}`
    ).then(() => {
      setList(
        list.filter((val) => {
          return val._id != _id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("https://mern-web-appliaction-crud-litu.herokuapp.com/read", {
      name: name,
      age: age,
    })
      .then((response) => {
        setList(response.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <div>
      <div className="inputs">
        <input
          type="text"
          placeholder="Enter name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Enter age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

        <button className="button" onClick={send}>
          send
        </button>
      </div>
      <div className="usersList">
        {list.map((val) => {
          return (
            <div className="userContainer">
              <div className="users">
                <h3>Name : {val.name}</h3>
                <h3> Age : {val.age}</h3>
              </div>
              <button
                onClick={() => {
                  update(val._id);
                }}
              >
                update
              </button>
              <button
                onClick={() => {
                  del(val._id);
                }}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
