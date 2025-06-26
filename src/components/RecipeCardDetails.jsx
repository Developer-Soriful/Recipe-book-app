import { useContext, useState } from "react";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Auth/AuthContext";

const RecipeCardDetails = () => {
    const recipe = useLoaderData();
    const { user } = useContext(AuthContext)
    
    // Add error handling
    if (!user) {
        return <div className="text-center py-10">Loading...</div>;
    }

    const {
        photo,
        title,
        ingredients,
        instructions,
        cuisine,
        preparetion_time,
        categors,
        likeCount
    } = recipe;
    const [like, setLike] = useState(likeCount || 0)
    const handleLike = (id) => {
        fetch(`https://server-side-eight-pearl.vercel.app/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    setLike(like + 1);
                }
            })
            .catch(error => {
                console.error('Error updating like:', error);
            });
    };


    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center min-h-[80vh] my-10">
                <Link to="/" className="text-lg text-start font-bold hover:underline">
                    ← Back to AddNew
                </Link>
                <div className="px-5 text-lg text-green-500">
                    <span className="text-red-500">{like || 0}</span>  people interested in this recipe
                </div>
                <div className="flex flex-col  rounded-2xl min-w-[90vw] lg:min-w-[40vw] border-2 border-gray-700 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl" style={{ height: '500px' }}>
                    {/* Image */}
                    <div className="h-1/2 w-full overflow-hidden bg-black">
                        <img
                            src={photo || "/fallback-image.jpg"}
                            alt={title}
                            className="h-full w-full object-contain"
                        />
                    </div>


                    {/* Content */}
                    <div className=" p-5 space-y-3">
                        {/* Title & Category */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <span className="px-3  py-1 rounded-full text-xs font-medium bg-blue-300 text-black">
                                {categors}
                            </span>
                        </div>

                        {/* Cuisine & Time */}
                        <div className="flex justify-between text-sm">
                            <p>Cuisine: <span className="font-medium">{cuisine}</span></p>
                            <p>⏱ {preparetion_time} mins</p>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h4 className="font-semibold">Ingredients:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                                {ingredients}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div>
                            <h4 className="font-semibold">Instructions:</h4>
                            <p className="text-sm text-gray-600 line-clamp-3">{instructions}</p>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end mt-4">
                            {/* Likes */}
                            <div className="flex items-center text-red-500 cursor-pointer" onClick={() => handleLike(recipe._id)}>
                                <FaHeart className="mr-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default RecipeCardDetails;
