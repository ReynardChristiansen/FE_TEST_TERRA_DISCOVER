import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';

const DisplayHome = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const getBearerToken = () => {
    const token = Cookies.get("token");
    return token ? atob(token) : null;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const token = getBearerToken();
        if (!token) {
          setMessage("No valid token found in cookies.");
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8080/getArticle', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.status === "ERROR") {
          setMessage(data.message);
          setArticles([]);
        } else if (Array.isArray(data)) {
          setArticles(data);
        }
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message || "Failed to fetch articles");
        }
        setArticles([]);
      }
      setLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-[20vh]">
          <ClipLoader color="#4cabe6" loading={loading} size={50} />
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-500 text-center">{message}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.ID} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <h2 className="text-black font-bold">{article.Title}</h2>
              <p className="text-gray-800 text-sm my-2">{article.Category}</p>
              <p className="text-gray-800 mb-4">{article.Content.substring(0, 100)}...</p>
              <p className="text-gray-500 text-xs">Created on: {new Date(article.CreatedDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayHome;
