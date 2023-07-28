import React, { useState } from "react";
import { register } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function Register() {
  // Register user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await register(email, password);
    if (register) {
      navigate("/login", {
        replace: true
      })
    }
  };

  return (
    <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1">
          <input
            type="email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          disabled={!email || !password}
          className="inline-flex cursor-pointer disabled:opacity-20 items-center px-4 py-2 border border-transparent text-sm font-medium rounded bg-indigo-600 text-white hover:bg-indigo-700"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
}
