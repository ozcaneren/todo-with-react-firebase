import React from "react";
import { useState } from "react";
import {auth, resetPassword, update} from "../firebase";
import {useDispatch, useSelector} from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || '')
  const [avatar, setAvatar] = useState(user.photoURL || '')
  const [password, setPassword] = useState('')

  const handleSubmit =  async e => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar
    })
    dispatch(login({
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      emailVerified: auth.currentUser.emailVerified,
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL
    }))
  }

  const handleResetSubmit = async e => {
    e.preventDefault()
    const result = await resetPassword(password)
    if (result) {
      setPassword('')
    }
  }

  return (
    <div className='grid gap-y-10'>
      <form onSubmit={handleSubmit} className='grid gap-y-4'>
        <h1 className='text-xl font-bold mb-4'>Update profile</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name-Surname</label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="John Doe"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            className="inline-flex cursor-pointer disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
      <form onSubmit={handleResetSubmit} className='grid gap-y-4'>
        <h1 className='text-xl font-bold mb-4'>Update password</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="istersen degistirme gardas"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            disabled={!password}
            className="inline-flex cursor-pointer disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded bg-indigo-600 text-white hover:bg-indigo-700"
            type="submit"
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  )
}