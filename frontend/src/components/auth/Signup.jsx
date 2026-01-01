import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "@/axiosInstance.js";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: null, // profile pic
  });

  const [preview, setPreview] = useState(null); // for image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
      setPreview(URL.createObjectURL(files[0])); // show preview
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullname", form.fullname);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      formData.append("password", form.password);
      formData.append("role", form.role);
      if (form.file) formData.append("file", form.file);

      await api.post("/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Signup successful 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>

        <input
          type="text"
          name="fullname"
          placeholder="Full name"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone number"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
          required
        />

        {/* Custom File Upload */}
        <div className="mb-4">
          <label className="block mb-1">Profile Picture</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Choose Profile Pic
            </button>
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-12 h-12 object-cover rounded-full border"
              />
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            name="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>

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
          Signup
        </button>

        <p className="text-sm mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
