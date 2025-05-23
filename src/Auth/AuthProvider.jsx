import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from './firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // loading true initially

    // ✅ Create User with Email and Password
    const createUser = async (email, password, name, photoURL) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;

            // Update user profile with name and photo
            await updateProfile(currentUser, {
                displayName: name,
                photoURL: photoURL,
            });

            console.log('✅ User created & profile updated!');
            setUser({ ...currentUser }); // optional but makes sure it's updated
            return userCredential;
        } catch (error) {
            console.error('❌ Error creating user:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // ✅ Login User
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setUser(userCredential.user); // optional but useful
                return userCredential;
            })
            .finally(() => {
                setLoading(false);
            });
    };
    // ✅ Google Login
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };
    // ✅ Logout
    const logout = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // ✅ Observe Auth Changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // cleanup
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logout,
        googleLogin
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
