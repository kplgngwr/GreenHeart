import React, { useState } from 'react';
import { useFirebase } from '../../context/firebase';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUpPage = () => {
  const { signUpWithEmailAndPassword } = useFirebase();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Consumer'); // Default role is Consumer
  const [gender, setGender] = useState(''); // New gender state
  const [deviceId, setDeviceId] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name.trim() || !email.trim() || !password.trim() || !gender.trim()) {
      setError("Name, Email, Password, and Gender are required.");
      toast.error("Name, Email, Password, and Gender are required.");
      return;
    }

    if (role === "Farmer") {
      if (!farmSize.trim() || !location.trim()) {
        setError("For farmers, Farm Size and Location are required.");
        toast.error("For farmers, Farm Size and Location are required.");
        return;
      }
    }

    // Log the form data before sending to signup
    console.log({
      name,
      role,
      gender,
      deviceId,
      farmSize,
      location,
      email,
      password,
    });
    try {
      if (role === "Farmer") {
        // Pass parameters in the order: email, password, name, gender, role, deviceId, farmSize, location
        await signUpWithEmailAndPassword(email, password, name, gender, role, deviceId, farmSize, location);
      } else {
        await signUpWithEmailAndPassword(email, password, name, gender, role, deviceId);
      }
      toast.success("Sign up successful! Please sign in.");
      // Redirect to signin after a short delay (e.g., 3 seconds)
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="lg:min-h-screen min-h-[45rem] flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          {/* Role Dropdown */}
          <div className="flex justify-between gap-2">
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Consumer">Consumer</option>
                <option value="Admin">Admin</option>
                <option value="Farmer">Farmer</option>
              </select>
            </div>
            {/* Gender Dropdown */}
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="" disabled>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {/* Conditionally show extra fields for farmers */}
          {role === "Farmer" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Farm Size</label>
                <input
                  type="text"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your farm size (e.g., 5 acres)"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your farm location"
                  required
                />
              </div>
            </>
          )}
          {/* Device ID Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Device ID</label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your device ID (if applicable)"
            />
          </div>
          {/* Email and Password Inputs */}
          <div className="flex justify-between gap-2">
            <div className="mb-4 w-full">
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
            <div className="mb-6 w-full">
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
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        {/* Line prompting existing users */}
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/signin" className="text-green-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
