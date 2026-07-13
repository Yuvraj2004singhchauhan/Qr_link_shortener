import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";



function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      console.log(formData);
      const data = await loginUser(formData);

      login(data);

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white items-center justify-center">

        <div className="max-w-md">

          <h1 className="text-5xl font-bold mb-6">
            QR Link Shortener
          </h1>

          <p className="text-xl leading-8">
            Create, manage and analyze your shortened URLs
            with real-time analytics and QR codes.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex justify-center items-center bg-gray-100">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-[420px]">

          <h2 className="text-3xl font-bold mb-8 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              name="username"
              placeholder="Enter Your Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>

          {/* Register Link */}

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;