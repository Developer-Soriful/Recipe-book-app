import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import RecipeCard from '../components/RecipeCard'

const AllRecipe = () => {
  const recipeData = useLoaderData()
  const [recipeCardData, setRecipeCardData] = useState(recipeData)
  const handleCuisineChange = (e) => {
    // select korbo full target tare
    const selectTarget = e.target.value
    if (selectTarget === "All") {
      setRecipeCardData(recipeData)
    } else {
      const filterd = recipeData.filter(data => data.cuisine === selectTarget)
      setRecipeCardData(filterd)
    }
  }

  return (
    <div>
      <div className='my-5'>
        <label className="block mb-2 font-semibold">Cuisine Type</label>
        <select
          className="border px-6 cursor-pointer py-2 text-center focus:outline-none rounded"
          name="cuisine"
          id="cuisine"
          onChange={handleCuisineChange}
        >
          <option className=' text-black' value="All">All</option>
          <option className=' text-black' value="Italian">Italian</option>
          <option className=' text-black' value="Mexican">Mexican</option>
          <option className=' text-black' value="Indian">Indian</option>
          <option className=' text-black' value="Chinese">Chinese</option>
          <option className=' text-black' value="Others">Others</option>
        </select>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-10">
        {
          recipeCardData.length > 0 ? (
            recipeCardData.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No recipes found for this cuisine.
            </p>
          )
        }
      </main>
    </div>
  )
}

export default AllRecipe
