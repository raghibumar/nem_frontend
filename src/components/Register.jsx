import React, { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleSubmitUserDetails = () => {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      age: user.age,
    };
    console.log(payload);
    fetch("https://nem-backend-tvjb.onrender.com/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json)
      .then((data) => {
        console.log("data:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>Registration Page</div>
      <div className="register-form">
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="Enter your age"
          name="age"
          value={user.age}
          onChange={(e) => {
            setUser({ ...user, age: e.target.value });
          }}
        />
        <button onClick={handleSubmitUserDetails}>Register</button>
      </div>
    </>
  );
};
export { Register };
