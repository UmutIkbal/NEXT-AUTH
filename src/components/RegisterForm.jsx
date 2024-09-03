"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {
    const router = useRouter();
    const loginUrl = "/login";


    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordAgain = formData.get('password-again');
        const username = email.split('@')[0]

        if (password === passwordAgain) {
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        username: username,
                        password: password,
                    }),
                });

                if (res.ok) {
                    router.push('/login');
                } else {
                    console.log('Registration failed.');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }

    }

    return (
        <div className='flex justify-center content-center mt-24'>
            <div className='blue_shadow p-24'>
                <form className="flex flex-col mb-5" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        className='input'
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        className='input'
                        required
                    />
                    <input
                        type="password"
                        name='password-again'
                        placeholder='Password Again'
                        className='input'
                        required
                    />
                    <button type='submit' className='sign_button'>
                        Register
                    </button>
                </form>
                <div className='flex flex-col justify-center content-center gap-8'>
                    <div className='flex flex-col content-center justify-center'>
                        <p className='self-center'>
                            If you have an account
                        </p>
                        <Link
                            href={loginUrl}
                            className='self-center blue_gradient'
                        >
                            Log In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;