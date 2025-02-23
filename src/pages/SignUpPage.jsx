import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config';
import { SIGN_IN } from '../constants/routes'

import { FiAtSign } from 'react-icons/fi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BiUser } from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'

import { motion } from 'framer-motion'

const SignUpPage = () => {
  const provider = new GoogleAuthProvider() 

	const [firstName, setFirstName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const isInvalid = firstName === '' || password === '' || email === ''

	const handleSignUp = (e) => {
		e.preventDefault()
		

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      updateProfile(userCredential.user, {
        // set the user's display name to the first name
        displayName: firstName,
      })
      console.log(userCredential)
    }).catch((error) => {
      setFirstName('')
      setEmail('')
      setPassword('')
      setError(error.message)
    })

    // console.log(userCredential)
  }
  
  const signInGoogle = async () => {
    // console.log("Signed In with google")
    const response = await signInWithPopup(auth, provider)
    console.log(response)
  }

	return (
		<div className='w-screen h-screen flex items-center justify-center text-black bg-gradient-to-br from-red-300 to-red-50'>
			<div className='shadow-xl min-w-[350px] border min-h-[550px] bg-white rounded-2xl flex flex-col items-center justify-center p-4 gap-8'>
				<div>
					<h1 className='text-4xl text-red-500 text-center'>
						Sign Up
					</h1>
					<p className='text-gray-400 text-[.9rem] mt-2'>
						Please fill the details to create an account
					</p>
				</div>
				<form
					onSubmit={handleSignUp}
					method='POST'
					className='w-full flex flex-col gap-4'
				>
					{error && (
						<div className='text-sm text-yellow-600'>{error}</div>
					)}
					<div className='flex items-center'>
						<BiUser className='absolute z-10 ml-4 text-gray-500 text-lg' />
						<input
							placeholder='First Name'
							className='border-2 w-full  px-10 py-2 rounded-full relative outline-none'
							value={firstName}
							onChange={({ target }) =>
								setFirstName(target.value)
							}
						/>
					</div>
					<div className='flex items-center'>
						<FiAtSign className='absolute z-10 ml-4 text-gray-500 text-lg' />
						<input
							placeholder='Email'
							className='border-2 w-full  px-10 py-2 rounded-full relative outline-none'
							value={email}
							onChange={({ target }) => setEmail(target.value)}
						/>
					</div>
					<div className='flex items-center'>
						<RiLockPasswordLine className='absolute z-10 ml-4 text-gray-500 text-lg' />
						<input
							placeholder='Password'
							className='border-2 w-full  px-10 py-2 rounded-full relative outline-none'
							value={password}
							type='password'
							autoComplete='off'
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>

					<motion.button
						whileTap={{ scale: 0.8 }}
						className='bg-red-500 py-3 text-white rounded-full cursor-pointer disabled:opacity-80 disabled:cursor-auto'
						disabled={isInvalid}
					>
						Sign Up
					</motion.button>
				</form>
				<div className='w-full'>
					<p className='text-sm text-gray-600'>
						Already have an account?{' '}
						<Link
							to={SIGN_IN}
							className='text-red-500 cursor-pointer'
						>
							Sign In
						</Link>
					</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-4'>
					<p className='text-sm text-gray-600'>or continue with</p>
					<motion.div
						whileTap={{ scale: 0.8 }}
            className='bg-white hover:shadow-xl p-2 rounded-full border-2 border-gray-100 cursor-pointer'
            onClick={signInGoogle}
					>
						<FcGoogle className=' text-3xl ' />
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default SignUpPage
