import React, { useState } from "react";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLoginUser = () => {
    const payload = {
      email: user.email,
      password: user.password,
    };

    fetch("https://nem-backend-tvjb.onrender.com/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>Login Page</div>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={user.password}
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
        <button onClick={handleLoginUser}>Login</button>
      </div>
    </>
  );
};
