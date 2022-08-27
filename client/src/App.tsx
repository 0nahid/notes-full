import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from "react-router-dom";
import Login from './Auth/Login';
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
  return (
    <div>
      <div>
        {loading ? <Loader /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}
