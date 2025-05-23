import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import MyRecipeCard from '../components/MyRecipeCard';

const MyRecipes = () => {
    const { user, loading } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        if (user?.email) {
            fetch(`https://server-side-eight-pearl.vercel.app/users/email/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setItems(data || []);
                })
                .catch(err => console.error(err));
        }
    }, [user?.email]);
    
    // ✅ Delete handler
    const handleDelete = (id) => {
        const filtered = items.filter(item => item._id !== id);
        setItems(filtered);
    };

    if (loading) {
        return <p>loading....</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
                <MyRecipeCard
                    key={item._id}
                    item={item}
                    onDelete={() => handleDelete(item._id)} // ✅ Pass onDelete function
                />
            ))}
        </div>
    );
};

export default MyRecipes;
