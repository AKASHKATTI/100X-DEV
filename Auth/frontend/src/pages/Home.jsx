import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/auth/get-profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete("http://localhost:5000/api/auth/logout-user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error("Error during logout", error);
        } finally {
            // Always clear the token locally and redirect, even if the backend request fails
            localStorage.removeItem("token");
            navigate("/signin");
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-3xl font-bold text-gray-800'>
                    Welcome to the Home Page
                </h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                    Logout
                </button>
            </div>
            
            {user ? (
                <div className="space-y-4 text-gray-700">
                    <p className="text-lg"><strong>Username:</strong> {user.username}</p>
                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p className="text-gray-500">Could not load user profile.</p>
            )}
        </div>
    </div>
  )
}

export default Home