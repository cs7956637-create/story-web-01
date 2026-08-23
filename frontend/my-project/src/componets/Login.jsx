import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        name,
        password
      });

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // alert(res.data.message);
    toast.success(res.data.message);

      // Redirect to profile
      navigate("/profile");

    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-slate-400 text-center mb-8 text-2xl font-bold ">LOGIN_PAGE</h1>

    <div className="p-3">
        <form onSubmit={loginUser}>
        <input
        className="w-full rounded-lg p-2"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input className="w-full rounded-lg p-2"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700
      text-white font-semibold py-3 rounded-lg
      transition duration-200">
          Login
        </button>
      </form>
      <p className="text-white p-4">if you dont have account create it <Link to={"/signup"} className="text-blue-600 p-2">signup</Link></p>
    </div>
   
      </div>

   
    </div>
  );
}

export default Login;