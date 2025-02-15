import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Add = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Publish");
  const [message, setMessage] = useState("");

  const getBearerToken = () => {
    const token = Cookies.get("token");
    return token ? atob(token) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getBearerToken();
    if (!token) {
      setMessage("No valid token found in cookies.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/createArticle",
        { title, content, category, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "SUCCESS") {
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Submit failed");
      }
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Create Article
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-black w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="text-black w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="text-black w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-black w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="Publish">Publish</option>
              <option value="Draft">Draft</option>
              <option value="Thrash">Thrash</option>
            </select>
          </div>
          <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition">
            Submit
          </button>
        </form>
        {message && <p className="text-red-500 text-center mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Add;
