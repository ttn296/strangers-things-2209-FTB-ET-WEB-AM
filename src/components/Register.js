import React, { useState } from "react";

const Register = () => {
  const cohortName = "2209-FTB-ET-WEB-AM";
  const [registerUsername, setUsername] = useState("");
  const [registerPassword, setPassword] = useState("");

  const register = (ev) => {
    ev.preventDefault();
    // console.log("hello world");
    fetch(
      `https://strangers-things.herokuapp.com/api/${cohortName}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: registerUsername,
            password: registerPassword,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        if (!result.success) {
          throw result.error;
        }
        console.log(result);
      })
      .catch(console.error);
  };
  return (
    <div className="register">
    <form onSubmit={register} className="register-form">
      <input
        placeholder="username"
        value={registerUsername}
        onChange={(ev) => setUsername(ev.target.value)}
      ></input>
      <input
        placeholder="password"
        value={registerPassword}
        onChange={(ev) => setPassword(ev.target.value)}
      ></input>
      <button>Register</button>
    </form>
    </div>
  );
};
export default Register;
