import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Auth/AuthContext'
import { Link, useNavigate } from 'react-router'
import Swal from 'sweetalert2'

const AddRecipe = () => {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()
  // this is for handle submit 
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form)
    const recipeData = Object.fromEntries(formData.entries())
    // auto set value
    recipeData.likeCount = 0;
    recipeData.userEmail = user?.email || "No Email";
    recipeData.userName = user?.displayName || "Anonymous";
    recipeData.userPhoto = user?.photoURL || "https://i.ibb.co/2tJ4H9R/user.png";

    fetch(`https://server-side-eight-pearl.vercel.app/users`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(recipeData)
      }
    ).then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Recipe added successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/myrecipes')
          // Clear form after successful submission
          form.reset();
        }
      })
      .catch(err => {
        console.log(err.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      })
  }
  if (loading) {
    return <div className='min-h-screen flex justify-center items-center'>
      <span className="loading loading-ring loading-xl"></span>
    </div>
  }

  useEffect(() => {
    console.log("👤 User from Context:", user);
  }, [user]);

  return (
    <div className='flex flex-col justify-center items-start w-full mb-10'>
      {/* Back to AddNew */}
      <Link to="/" className="text-lg font-bold hover:underline">
        ← Back to AddNew
      </Link>

      {/* Form Container */}
      <div className="  mt-6 p-10 rounded-md shadow-sm w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-cursive mb-4">
          Add New Recipes
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">


          {/* Chef */}
          <div>
            <label className="block mb-2 font-semibold ">Title.</label>
            <input required type="text" name='title' placeholder="Enter title" className="w-full p-2 border rounded" />
          </div>

          {/* Supplier */}
          <div>
            <label className="block mb-2 font-semibold ">Ingredients</label>
            <input required type="text" name='ingredients' placeholder="Enter ingredients" className="w-full p-2 border rounded" />
          </div>
          {/* Details */}
          <div>
            <label className="block mb-2 font-semibold ">Instructions</label>
            <input required type="text" name='instructions' placeholder="Enter instructions" className="w-full p-2 border rounded" />
          </div>
          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold ">Cuisine Type</label>
            <select className='w-full border p-2 focus:outline-none rounded' name="cuisine" id="cuisine">
              <option className='text-white bg-black' value="Italian">Italian</option>
              <option className='text-white bg-black' value="Mexican">Mexican</option>
              <option className='text-white bg-black' value="Indian">Indian</option>
              <option className='text-white bg-black' value="Chinese">Chinese</option>
              <option className='text-white bg-black' value="Others">Others</option>
            </select>
          </div>
          {/* Taste */}
          <div>
            <label className="block mb-2 font-semibold ">Preparation Time</label>
            <input required type="text" name='preparetion_time' placeholder="Enter preparetion_time" className="w-full p-2 border rounded" />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold ">Categories</label>
            <input required type="text" name='categors' placeholder="Enter  categors" className="w-full p-2 border rounded" />
          </div>



          {/* Photo (single column full width) */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold ">Image.</label>
            <input required type="text" name='photo' placeholder="Enter photo URL" className="w-full p-2 border rounded" />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              className="bg-[#D2B48C] border border-black  py-2 px-6 rounded w-full font-semibold hover:bg-[#b9976b] transition"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AddRecipe