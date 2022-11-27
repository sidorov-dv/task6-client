import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = "https://chat-messages-task6.herokuapp.com/api/createUsers";
      const { data: res } = await axios.post(url, {
        name: userName,
      });
      console.log(res.message);
      navigate("/messages", { state: { currentName: userName } });
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
    <div className="row justify-content-center">
      <form
        className="col-7 mt-5 border border-info border-2 rounded bg-light bg-gradient p-4"
        onSubmit={loginUser}
      >
        <div className="mt-3 mb-5 form-floating">
          <input
            type="text"
            className="form-control"
            id="name"
            value={userName}
            onChange={userNameHandler}
            placeholder="User name"
            autoComplete="true"
            required
          />
          <label htmlFor="name">Enter name</label>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
