import React, { useState } from "react";

const Login = (props) => {
  const user = props.user;
  const setUser = props.setUser;
  const cohortName = "2209-FTB-ET-WEB-AM";
  const [loginUsername, setUsername] = useState("");
  const [loginPassword, setPassword] = useState("");
  const exchangeTokenForUser = props.exchangeTokenForUser;

  const login = (ev) => {
    ev.preventDefault();
    //console.log("hello world");
    fetch(
      `https://strangers-things.herokuapp.com/api/${cohortName}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: loginUsername,
            password: loginPassword,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) {
          throw result.error;
        }
        const token = result.data.token;
        window.localStorage.setItem("token", token);
        exchangeTokenForUser();
        fetch(
          `https://strangers-things.herokuapp.com/api/${cohortName}/users/me`,
          { 
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            const user = result.data;
            setUser(user);
          })
          .catch(console.error);
      })
      .catch((error) => console.log(error));
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
  };

  return (
    <div className="login">
      {user._id ? (
        <div className="logout-btn">
          Welcome {user.username} <button onClick={logout}>Log Out</button>
        </div>
      ) : null}
      {!user._id ? (
        <div>
          <form onSubmit={login} className="login-form">
            <input
              placeholder="username"
              value={loginUsername}
              onChange={(ev) => setUsername(ev.target.value)}
            ></input>
            <input
              placeholder="password"
              type="password"
              value={loginPassword}
              onChange={(ev) => setPassword(ev.target.value)}
            ></input>
            <button disabled={!loginUsername || !loginPassword}>Login</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
