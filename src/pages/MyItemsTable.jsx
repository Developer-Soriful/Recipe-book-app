import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import Swal from "sweetalert2";
const MyItemsTable = () => {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://server-side-eight-pearl.vercel.app/users/email/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data || []);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);
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
  } = items;
  //   this is for updating the data
  const handleUpdate = (id) => {
    Swal.fire({
      title: "Update Recipe",
      html: `
                  <div class="space-y-4 w-full">
                      <div class="flex gap-3">
                          <input id="photo" class="swal2-input" placeholder="Photo URL" value="${
                            photo || ""
                          }">
                          <input id="title" class="swal2-input" placeholder="Recipe Title" value="${
                            title || ""
                          }">
                          <input id="categors" class="swal2-input" placeholder="Category" value="${
                            categors || ""
                          }">
                      </div>
                      <div class="flex gap-3">
                          <input id="cuisine" class="swal2-input" placeholder="Cuisine" value="${
                            cuisine || ""
                          }">
                          <input id="preparetion_time" class="swal2-input" placeholder="Preparation Time" value="${
                            preparetion_time || ""
                          }">
                      </div>
                      <div>
                          <label class="block text-left mb-1">Ingredients:</label>
                          <textarea id="ingredients" class="swal2-textarea" placeholder="List ingredients">${
                            ingredients || ""
                          }</textarea>
                      </div>
                      <div>
                          <label class="block text-left mb-1">Instructions:</label>
                          <textarea id="instructions" class="swal2-textarea" placeholder="Enter instructions">${
                            instructions || ""
                          }</textarea>
                      </div>
                  </div>
              `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const photo = document.getElementById("photo").value;
        const title = document.getElementById("title").value;
        const categors = document.getElementById("categors").value;
        const cuisine = document.getElementById("cuisine").value;
        const preparetion_time =
          document.getElementById("preparetion_time").value;
        const ingredients = document.getElementById("ingredients").value;
        const instructions = document.getElementById("instructions").value;

        if (!title || !ingredients || !instructions) {
          Swal.showValidationMessage("Please fill in all required fields");
          return false;
        }

        return {
          photo,
          title,
          categors,
          cuisine,
          preparetion_time,
          ingredients,
          instructions,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updateData = result.value;

        fetch(`https://server-side-eight-pearl.vercel.app/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updateData),
        })
          .then((res) => res.json())
          .then((data) => {
            setRecipeData((prevData) => ({
              ...prevData,
              ...updateData,
            }));
            Swal.fire("Success", "Recipe updated successfully!", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };
  // ✅ Delete handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-side-eight-pearl.vercel.app/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
              onDelete(); // ✅ parent function call to remove from UI
            }
            setItems(data);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Cuisine</th>
            <th className="px-4 py-3">Ingredients</th>
            <th className="px-4 py-3">Instructions</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-3 font-semibold text-gray-700">
                  {item.title}
                </td>

                <td className="px-4 py-3 text-gray-600">{item.cuisine}</td>

                <td className="px-4 py-3 text-gray-600">
                  <ul className="list-disc pl-5 space-y-1">
                    {item.ingredients}
                  </ul>
                </td>

                <td className="px-4 py-3 text-gray-600 max-w-xs">
                  <p className="line-clamp-2">{item.instructions}</p>
                </td>

                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No items found.
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyItemsTable;
