import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from 'react-router';

const Profile = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleUpdate = async () => {
        try {
            await updateProfile(user, {
                displayName: name,
                photoURL: photo
            });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });

            setEditMode(false);
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire({
                icon: { error },
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10  rounded-2xl shadow-lg p-6 text-center border border-gray-200">
            <div>
                <Link to={`/`}>
                    <FaRegArrowAltCircleLeft />
                </Link>
            </div>
            <div className="flex flex-col items-center">
                <img
                    src={user?.photoURL || 'https://i.ibb.co/2tJ4H9R/user.png'}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
                />
                {editMode ? (
                    <>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Display Name"
                            className="mt-3 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            placeholder="Photo URL"
                            className="mt-2 p-2 border rounded w-full"
                        />
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mt-4  ">
                            {user?.displayName || "Unknown User"}
                        </h2>
                        <p className="text-gray-500">{user?.email || "No Email Found"}</p>
                    </>
                )}

                <div className="mt-4 flex gap-2">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="btn btn-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="btn btn-sm bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setEditMode(true)}
                                className="btn btn-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={logout}
                                className="btn btn-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
