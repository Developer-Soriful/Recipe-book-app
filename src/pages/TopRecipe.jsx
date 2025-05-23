import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const TopRecipe = ({ toprecipe }) => {
  const [Recipe, setRecipe] = useState(toprecipe);
  
  if (!Array.isArray(Recipe) || Recipe.length === 0) {
    return <div className="text-center py-4">No recipes found</div>;
  }

  return (
    <>
      {
        Recipe.map(recipe => {
          return <div key={recipe._id} className=" rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden  border-[0.1px] border-gray-700 p-3">
            {/* Image */}
            <div className="h-48 w-full ">
              <img
                src={recipe.photo}
                alt={recipe.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              {/* Title */}
              <h3 className="text-xl font-bold ">{recipe.title}</h3>

              {/* Cuisine Type  */}
              <p className="text-sm ">
                <span className="font-medium ">Cuisine:</span> {recipe.cuisine}
              </p>

              {/* Like count */}
              <div className="flex items-center gap-1 text-sm ">
                <Heart className="w-4 h-4 text-red-500" />
                {recipe.likeCount} Likes
              </div>

              {/* View Details Button */}
              <Link
                to={`/users/${recipe._id}`}
                className="inline-block mt-3 text-center bg-[#D2B48C] hover:bg-[#b9976b] text-black font-semibold py-2 px-4 rounded w-full transition"
              >
                View Details
              </Link>
            </div>
          </div>
        })
      }
    </>

  );
};

export default TopRecipe;
