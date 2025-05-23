import { useEffect, useState } from "react";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyRecipeCard = ({ item, onDelete }) => {
    const [recipeData, setRecipeData] = useState(item);

    const {
        _id,
        photo,
        title,
        ingredients,
        instructions,
        cuisine,
        preparetion_time,
        categors,
        likeCount,
    } = recipeData;

    // Handle Update
    const handleUpdate = (id) => {
        Swal.fire({
            title: 'Update Recipe',
            html: `
                <div class="space-y-4 w-full">
                    <div class="flex gap-3">
                        <input id="photo" class="swal2-input" placeholder="Photo URL" value="${photo || ''}">
                        <input id="title" class="swal2-input" placeholder="Recipe Title" value="${title || ''}">
                        <input id="categors" class="swal2-input" placeholder="Category" value="${categors || ''}">
                    </div>
                    <div class="flex gap-3">
                        <input id="cuisine" class="swal2-input" placeholder="Cuisine" value="${cuisine || ''}">
                        <input id="preparetion_time" class="swal2-input" placeholder="Preparation Time" value="${preparetion_time || ''}">
                    </div>
                    <div>
                        <label class="block text-left mb-1">Ingredients:</label>
                        <textarea id="ingredients" class="swal2-textarea" placeholder="List ingredients">${ingredients || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-left mb-1">Instructions:</label>
                        <textarea id="instructions" class="swal2-textarea" placeholder="Enter instructions">${instructions || ''}</textarea>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                const photo = document.getElementById('photo').value;
                const title = document.getElementById('title').value;
                const categors = document.getElementById('categors').value;
                const cuisine = document.getElementById('cuisine').value;
                const preparetion_time = document.getElementById('preparetion_time').value;
                const ingredients = document.getElementById('ingredients').value;
                const instructions = document.getElementById('instructions').value;

                if (!title || !ingredients || !instructions) {
                    Swal.showValidationMessage('Please fill in all required fields');
                    return false;
                }

                return {
                    photo,
                    title,
                    categors,
                    cuisine,
                    preparetion_time,
                    ingredients,
                    instructions
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updateData = result.value;
                
                fetch(`https://server-side-93le6ou2k-md-soriful-islams-projects.vercel.app/users/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updateData)
                })
                .then(res => res.json())
                .then(data => {
                    console.log("Updated:", data);
                    // Update local state with new data
                    setRecipeData(prevData => ({
                        ...prevData,
                        ...updateData
                    }));
                    Swal.fire("Success", "Recipe updated successfully!", "success");
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire("Error", "Something went wrong!", "error");
                });
            }
        });
    };

    // Handle Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-side-93le6ou2k-md-soriful-islams-projects.vercel.app/users/${id}`, {
                    method: "DELETE",
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
                        onDelete(); // ✅ parent function call to remove from UI
                    }
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire("Error", "Something went wrong!", "error");
                });
            }
        });
    };

    return (
        <div className="flex justify-center items-center my-10">
            <div className="flex flex-col rounded-2xl w-full border-2 border-gray-700 shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl" style={{ height: '500px' }}>
                {title ? (
                    <>
                        {/* Normal view */}
                        <div className="h-1/2 w-full overflow-hidden bg-black">
                            <img
                                src={photo || "/fallback-image.jpg"}
                                alt={title}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="p-5 space-y-3 overflow-y-scroll">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">{title}</h2>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-300 text-black">
                                    {categors}
                                </span>
                            </div>

                            <div className="flex justify-between text-sm">
                                <p>Cuisine: <span className="font-medium">{cuisine}</span></p>
                                <p>⏱ {preparetion_time} mins</p>
                            </div>

                            <div>
                                <h4 className="font-semibold">Ingredients:</h4>
                                <p className="text-sm whitespace-pre-wrap">{ingredients}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold">Instructions:</h4>
                                <p className="text-sm line-clamp-3 whitespace-pre-wrap">{instructions}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-400 py-10">
                        <p>No data found.</p>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-4 px-5 pb-5">
                    <div className="flex items-center text-red-500">
                        <FaHeart className="mr-1" />
                        <span>{likeCount}</span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => handleUpdate(_id)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-sm px-3 py-1 rounded-lg flex items-center gap-1"
                        >
                            <FaEdit /> Update
                        </button>
                        <button 
                            onClick={() => handleDelete(_id)} 
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRecipeCard;
