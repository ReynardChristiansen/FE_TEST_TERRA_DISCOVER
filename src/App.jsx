import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "./components/Sidebar";
import Display from "./components/Display";

const App = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const usernameRef = useRef("");
  const [formData, setFormData] = useState({
    user_name: "",
    user_password: "",
  });

  const [formDataRegister, setFormDataRegister] = useState({
    user_name: "",
    email: "",
    user_password: "",
    confirm_password: "",
  });

  const [isRegistering, setIsRegistering] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormDataRegister({ ...formDataRegister, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: formData.user_name,
        password: formData.user_password,
      });

      if (response.data.status === "SUCCESS") {
        const encodedToken = btoa(response.data.token);

        Cookies.set("token", encodedToken, {
          expires: 7,
          sameSite: "None",
          secure: true,
        });
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formDataRegister.user_password !== formDataRegister.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    const dataForm = {
      username: formDataRegister.user_name,
      email: formDataRegister.email,
      password: formDataRegister.user_password,
    };

    try {
      const registerResponse = await axios.post(
        "http://localhost:8080/register",
        dataForm
      );
      if (registerResponse.data.status == "SUCCESS") {
        try {
          const loginResponse = await axios.post(
            "http://localhost:8080/login",
            {
              username: formDataRegister.user_name,
              password: formDataRegister.user_password,
            }
          );

          if (loginResponse.data.status === "SUCCESS") {
            const encodedToken = btoa(loginResponse.data.token);

            Cookies.set("token", encodedToken, {
              expires: 7,
              sameSite: "None",
              secure: true,
            });
            window.location.reload();
          }
        } catch (error) {
          if (error.response) {
            setError(error.response.data.message || "Login failed");
          }
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Register failed");
      }
    }
  };

  useEffect(() => {
    setToken(Cookies.get("token"));
    usernameRef.current.focus();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 overflow-y-auto">
      {token ? (
        <div className="h-screen w-full flex flex-col">
          <div className="h-[40%]">
            <Sidebar />
            <div>
              <Display />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isRegistering ? "Register" : "Login"}
          </h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                ref={usernameRef}
                type="text"
                name="user_name"
                value={isRegistering ? formDataRegister.user_name : formData.user_name}
                onChange={isRegistering ? handleInputChangeRegister : handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formDataRegister.email}
                  onChange={handleInputChangeRegister}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="user_password"
                value={isRegistering ? formDataRegister.user_password : formData.user_password}
                onChange={isRegistering ? handleInputChangeRegister : handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formDataRegister.confirm_password}
                  onChange={handleInputChangeRegister}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}
            <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <p className="text-center text-sm text-gray-600 mt-4">
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
