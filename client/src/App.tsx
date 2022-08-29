import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import RequireAuth from './Auth/Secure/RequireAuth';
import auth from './firebase.init';
import Home from './Home/Home';
import Loader from './Shared/Loader';
import Navbar from './Shared/Navbar';

export default function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const [user] = useAuthState(auth);
  return (
    <div>
      <div>
        {loading ? <Loader /> :
          user ? <Navbar /> : ''
        }
        <Routes>
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}
