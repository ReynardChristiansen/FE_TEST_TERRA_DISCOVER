import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center w-full top-0 left-0 z-50">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Frontend</h1>
            </div>
            <div className="flex gap-6">
                <button 
                    onClick={() => navigate('/')} 
                    className="px-4 py-2 text-gray-800 font-semibold transition-all duration-300 hover:text-indigo-600 hover:scale-105"
                >
                    Display All
                </button>
                <button 
                    onClick={() => navigate('/Add')} 
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-indigo-500 hover:scale-105"
                >
                    Add Data
                </button>
                <button 
                    onClick={handleLogout} 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-red-500 hover:scale-105"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;
