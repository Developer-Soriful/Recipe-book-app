import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../Auth/AuthContext'
import Swal from 'sweetalert2'
import Footer from '../components/Footer'
import Header from '../components/Header'

const SignUp = () => {
    const navigate = useNavigate()
    const { createUser, googleLogin } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const { email, password, name, photourl } = Object.fromEntries(formData.entries())
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!passwordRegex.test(password)) {
            alert("❌ Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }
        createUser(email, password, name, photourl)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')

            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: { err },
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
                console.log(err);
            })
    }

    // this is google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
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
    return (
        <>
            <Header />
            <div className='min-h-[80vh] flex justify-center items-center'>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className='text-3xl font-semibold text-center mb-10'>SignUp Page</h1>
                    <div className="card-body">
                        <div >
                            <button onClick={handleGoogleLogin} className='btn btn-neutral w-full'>Login with Google</button>
                        </div>
                        <form onSubmit={handleSubmit} className="fieldset">
                            <label className="label flex flex-col items-start">
                                <span>
                                    Name
                                </span>
                                <input required type="text" name='name' className="input" placeholder="Enter Name" />
                            </label>
                            <label className="label flex flex-col items-start">
                                <span>
                                    Photo url
                                </span>
                                <input required type="text" name='photourl' className="input" placeholder="Pest photo url" />
                            </label>
                            <label className="label flex flex-col items-start">
                                <span>
                                    Email
                                </span>
                                <input required type="email" name='email' className="input" placeholder="Email" />
                            </label>
                            <label className="label flex flex-col items-start">
                                <span>
                                    Password
                                </span>
                                <input required type="password" name='password' className="input" placeholder="Password" />
                            </label>
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button type='submit' className="btn btn-neutral mt-4">SignUp</button>
                            <hr className='border border-gray-400 mt-4' />
                            <p className='text-center'>already sign up ? <Link className='text-green-500' to={`/login`}>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default SignUp