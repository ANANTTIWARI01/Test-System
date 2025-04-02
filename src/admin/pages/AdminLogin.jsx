import React, { useState } from "react";
import instance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/Auth";

function Login() {
  const navigate = useNavigate();
  const { checkAuthentication } = useAdminAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/admin/login", form);
      checkAuthentication();
      navigate("/admin/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoFocus
        />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/admin/register">Register</Link>
    </>
  );
}

export default Login;
