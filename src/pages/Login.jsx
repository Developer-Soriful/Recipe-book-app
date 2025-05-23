import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { AuthContext } from '../Auth/AuthContext'
import Swal from 'sweetalert2'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Login = () => {
    const navigate = useNavigate()
    const { loginUser, googleLogin } = useContext(AuthContext)
    const [success, setSuccess] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const { email, password } = Object.fromEntries(formData.entries())

        loginUser(email, password)
            .then(() => {
                setSuccess(true)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {

                navigate('/')

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                console.log(user);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    if (success) {
        return <Navigate to="/" />  // ✅ proper redirect
    }

    return (
        <>
            <div>
                <Header />
                <div className='min-h-[80vh] flex justify-center items-center'>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <h1 className='text-3xl font-semibold text-center mb-10'>Login Page</h1>
                        <div className="card-body">
                            <div >
                                <button onClick={handleGoogleLogin} className='btn btn-neutral w-full'>Login with Google</button>
                            </div>
                            <form onSubmit={handleSubmit} className="fieldset">
                                <label className="label flex flex-col items-start">
                                    <span>Email</span>
                                    <input required type="email" name='email' className="input" placeholder="Email" />
                                </label>
                                <label className="label flex flex-col items-start">
                                    <span>Password</span>
                                    <input required type="password" name='password' className="input" placeholder="Password" />
                                </label>
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button type='submit' className="btn btn-neutral mt-4">Login</button>
                                <hr className='border border-gray-400 mt-4' />
                                <p className='text-center'>Already signed up? <Link className='text-green-500' to={`/signup`}>Sign Up</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>

    )
}

export default Login
