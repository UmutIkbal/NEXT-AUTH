"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { doSocialLogin, doCredentialLogin } from '@/app/action'
import { useRouter } from "next/navigation";


const LoginForm = () => {
    const registerUrl = "/register"
    const router = useRouter();

    console.log("loginform")

    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);

            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    }

    return (
        <div className='flex justify-center content-center mt-24'>
            <div className='todos p-24'>
                <form className="flex flex-col mb-5 gap-2" onSubmit={onSubmit}>
                    <input
                        type="email"
                        name='email'
                        placeholder='email'
                        className='input'
                    />
                    <input
                        type="password"
                        name='password'
                        placeholder='password'
                        className='input'
                    />
                    <button type='submit' className='sign_button'>
                        Log In
                    </button>
                </form>

                <form action={doSocialLogin} className='flex flex-col mb-5 gap-2'>
                    <button type='submit' name='action' value='google' className='sign_button'>
                        Google
                    </button>
                </form>

                <div className='flex flex-col justify-center content-center gap-8'>
                    <div className='flex flex-col content-center justify-center'>
                        <p className='self-center'>
                            if you don't have an account
                        </p>
                        <Link
                            href={registerUrl}
                            className='self-center blue_gradient'
                        >
                            register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;