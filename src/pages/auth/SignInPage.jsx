import React, { useState } from 'react';
import { useFirebase } from '../../context/firebase';

const SignInPage = () => {
  const { signInWithEmailAndPassword } = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="lg:min-h-screen min-h-[35rem] flex gap-10 items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          If you don't have an account?{' '}
          <a href="/signup" className="text-green-600 font-semibold hover:underline">
            Signup
          </a>
        </p>
        
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md  ">
          <h3 className="text-lg text-emerald-700 font-semibold mb-4">Demo Credentials</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <span className="font-bold">Admin:</span> kapilkp2003@gmail.com / kplgngwr
            </li>
            <li>
              <span className="font-bold">Farmer:</span> alok9532@gmail.com / Alok@9532
            </li>
            <li>
              <span className="font-bold">Consumer:</span> alok953280@gmail.com / Alok@9532
            </li>
          </ul>
        </div>
    </div>
  );
};

export default SignInPage;
