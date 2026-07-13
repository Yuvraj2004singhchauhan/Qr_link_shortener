import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/authService"; 



function Register() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

        await registerUser(formData);

        navigate("/");

    }

    catch(error){
    console.log(error.response);
  }

}
  return (
    <div className="min-h-screen flex">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white items-center justify-center">

        <div className="max-w-md">

          <h1 className="text-5xl font-bold mb-6">
            QR Link Shortener
          </h1>

          <p className="text-xl leading-8">
            Join today and manage all your shortened links
            from one powerful dashboard.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex justify-center items-center bg-gray-100">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-[450px]">

          <h2 className="text-3xl font-bold text-center mb-8">

            Create Account

          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/"
              className="text-blue-600 ml-2 font-semibold"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;