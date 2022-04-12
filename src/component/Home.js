import React, { useContext, useState, useEffect, useRef } from "react";
import { GloabalContext } from "../globalstate/GlobalState";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

export default function Home() {
  const context = useContext(GloabalContext);
  const { state, dispatch } = context;
  const { users } = state;
  const [input, setInput] = useState("");
  const [thing, setThing] = useState([]);
  const [userValue, setUserValue] = useState("");
  const inputRef = useRef(null);
  // conditionaly render add or edit button

  const displayButton = thing.every((prev) => prev.editStatus == false);

  const submit = (e) => {
    e.preventDefault();
    if (displayButton) {
      if (input.trim() == "") return;
      dispatch({
        type: "add",
        payload: { user: input, id: nanoid(), editStatus: false },
      });
    } else {
      if (userValue.trim() == "") return;
      const updateUser = users.map((prev) => {
        if (prev.editStatus == true) {
          return {
            ...prev,
            editStatus: false,
            user: userValue,
          };
        } else {
          return prev;
        }
      });
      setThing(updateUser);
    }

    setUserValue("");
    setInput((prev) => (prev = ""));
  };

  //

  function edit(args, chick) {
    if (thing.length < 1) {
      let newState = users.map((arr) => {
        const { editStatus, id } = arr;
        if (id == args) {
          return {
            ...arr,
            editStatus: !editStatus,
          };
        } else {
          return {
            ...arr,
            editStatus: false,
          };
        }
      });
      setThing(newState);
    } else {
      setThing((prev) => {
        return prev.map((arr) => {
          const { editStatus, id } = arr;
          if (id == args) {
            return {
              ...arr,
              editStatus: !editStatus,
            };
          } else {
            return {
              ...arr,
              editStatus: false,
            };
          }
        });
      });
    }
  }
  // apply focus to input field
  function inputFocus() {
    if (thing.some((prev) => prev.editStatus == true)) {
      inputRef.current.focus();
    }
  }
  function editUser(value) {
    setUserValue(value);
  }
  useEffect(() => {
    const checking = thing.filter((prev) => prev.editStatus == true);
    dispatch({ type: "edit", payload: thing });
    inputFocus();
  }, [thing]);

  // rendered user infor

  const displayUser = state.users.map((prev) => {
    const { user, id, editStatus } = prev;
    const active = {
      outline: editStatus ? "2px solid #7f98c7" : "",
      transform: editStatus ? "scale(1.1)" : "",
      transition: "1 ease-in-out",
    };
    return (
      <div key={id} style={active} className="user-container">
        <motion.p
          initial={{
            y: -10,
          }}
          animate={{
            y: 0,
          }}
          onClick={() => edit(id, user)}
          className="user-p"
        >
          {user}
        </motion.p>
        <motion.button
          onClick={() => dispatch({ type: "remove", payload: id })}
          className="user-delete"
          whileTap={{
            scale: 1.1,
          }}
          whileHover={{
            scale: 1.1,
          }}
        >
          Delete
        </motion.button>
      </div>
    );
  });

  return (
    <div className="home">
      <div className="hero-container">
        <p>Add item press item to edit</p>
        <form onSubmit={submit} className="form">
          {displayButton ? (
            <input
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              placeholder="add item"
              className="form-input"
              type="text"
            />
          ) : (
            <input
              value={userValue}
              onChange={(e) => editUser(e.currentTarget.value)}
              placeholder="edit item"
              className="form-input"
              type="text"
              ref={inputRef}
            />
          )}
          {displayButton ? (
            <button className="form-add-btn btn">Add</button>
          ) : (
            <button className="form-edit-btn btn">Edit</button>
          )}
        </form>
        <section className="user-section">{displayUser}</section>
      </div>
    </div>
  );
}
