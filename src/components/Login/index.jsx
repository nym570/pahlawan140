import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { URL } from '../../config';
import { Link } from "react-router-dom";

export default function Login() {
  const backgroundImageUrl = "/image/base.png";

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // const userAccount = [
  //   {
  //     username: "hero140",
  //     password: "3515_140",
  //     role: "admin", // Role for admin
  //   },
  //   {
  //     username: "bps3515",
  //     password: "bps3515",
  //     role: "user", // Role for user
  //   },
  // ];

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axios.post(URL+'user/login', {username: username, password: password})
      .then((response) => {
        const token = response.data.data.token;
        const user= response.data.data.user;
        localStorage.setItem("tokenUser", token);
        localStorage.setItem("loginSuccess", "true");
       localStorage.setItem("userRole", user.role);
       if (user.role === "admin") {
            navigate("/dashboard");
          } else if (user.role === "user") {
            navigate("/myoffice");
          }
      })
      
    }
    catch (error){
      Swal.fire({
        title: "Gagal",
        text: "["+error.status+"] "+error.response.data.error,
        icon: "error"
      });
    }
    // const user = userAccount.find((user) => user.username === username);
  
    // if (!user) {
    //   setError({ username: "Username tidak terdaftar", password: "" });
    // } else if (password.length < 8) {
    //   setError({
    //     username: "",
    //     password: "Minimal panjang password 8 karakter",
    //   });
    // } else if (user.password !== password) {
    //   setError({ username: "", password: "Password tidak sesuai" });
    // } else {
    //   setError({ username: "", password: "" });
    //   localStorage.setItem("loginSuccess", "true");
    //   localStorage.setItem("userRole", user.role);
  
    //   // Redirect based on the user's role
    //   if (user.role === "admin") {
    //     navigate("/dashboard");
    //   } else if (user.role === "user") {
    //     navigate("/myoffice");
    //   }
    // }
  };
  

  return (
    <div
      className="flex h-screen px-0"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xs m-auto bg-base rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" src="/image/BPS.png" alt="Logo" />
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-pdarkblue" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-pdarkblue border-b-2 border-pdarkblue outline-none focus:bg-base bg-base"
              name="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>
          <div>
            <label className="block mb-2 text-pdarkblue" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full p-2 mb-6 text-pdarkblue border-b-2 border-pdarkblue outline-none focus:bg-base bg-base"
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer text-pdarkblue"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>

          </div>
          <div className="mt-4">
            <input
              className="w-full bg-pdarkblue hover:bg-pblue text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p style={{textAlign: "center"}} className="text-sm text-gray-500 font-assistant">
            <Link to="/" className="text-[#0B588F]">
             Kembali Ke Beranda
            </Link>
          </p>
      </div>
    </div>
  );
}
