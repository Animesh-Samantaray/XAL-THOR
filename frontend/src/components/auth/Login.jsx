import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "@/axiosInstance.js";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
    const dispatch=useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res= await api.post("/user/login", form);

      if(res.data.success){
        dispatch(setUser(res.data.user))
        toast.success("Login successful 🚀");
      navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="student"
              checked={form.role === "student"}
              onChange={handleChange}
            />
            Student
          </label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="role"
              value="recruiter"
              checked={form.role === "recruiter"}
              onChange={handleChange}
            />
            Recruiter
          </label>
        </div>

        <button className="w-full bg-purple-600 text-white p-2 rounded">
          Login
        </button>

        <p className="text-sm mt-3">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
