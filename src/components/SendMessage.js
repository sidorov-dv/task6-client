import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MessagesList from "./MessagesList";
import Select from "react-select";

const SendMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const currentUser = useRef(location.state.currentName);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [inputData, setInputData] = useState({
    title: "",
    text: "",
  });

  const getAllUsers = useCallback(async () => {
    try {
      setError("");
      let { data } = await axios.get(
        "https://chat-messages-task6.herokuapp.com/api/getAll"
      );
      let opt = data.map((item) => ({ value: item.name, label: item.name }));
      setAllUsers(opt);
      let ind = data.find((item) => item.name === currentUser.current);
      if (ind) {
        setMessages(ind.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value);
  };

  const subscribe = useCallback(async () => {
    try {
      let { data: res } = await axios.get(
        "https://chat-messages-task6.herokuapp.com/getMessage"
      );
      const { users } = res;
      let man = users.find((item) => item.name === currentUser.current);
      if (man) {
        setMessages(man.messages);
      } else {
        setMessages([]);
      }
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    subscribe();
  }, [subscribe]);

  const handleChange = ({ currentTarget: input }) => {
    setInputData({ ...inputData, [input.name]: input.value });
  };

  const sendMessages = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(
        "https://chat-messages-task6.herokuapp.com/postMessage",
        {
          name: selectedOption,
          messages: {
            date: new Date(),
            from: currentUser.current,
            title: inputData.title,
            text: inputData.text,
          },
        }
      );
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="row justify-content-center mt-5">
        <h1 className="col-8 text-center text-dark">
          Welcome - {currentUser.current}
        </h1>
        <form
          className="col-8 mt-3 mb-5 border border-success border-2 rounded bg-light bg-gradient p-4"
          onSubmit={sendMessages}
        >
          <Select
            className="mb-3"
            name="recipient"
            options={allUsers}
            onChange={handleTypeSelect}
            value={allUsers.filter(function (option) {
              return option.value === selectedOption;
            })}
          />
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3 form-floating">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={inputData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <label htmlFor="title">Title</label>
          </div>
          <div className="form-floating mb-5">
            <textarea
              style={{ minHeight: "100px" }}
              className="form-control"
              placeholder="Enter text message here"
              id="textMessage"
              name="text"
              value={inputData.text}
              onChange={handleChange}
              required
            ></textarea>
            <label htmlFor="textMessage">Enter text message here</label>
          </div>
          <button type="submit" className="btn btn-success me-4">
            Submit message
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Back to login
          </button>
        </form>
      </div>
      <div className="row justify-content-center">
        {messages.length > 0 && (
          <MessagesList messages={messages} name={currentUser.current} />
        )}
      </div>
    </>
  );
};

export default SendMessage;
