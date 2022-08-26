import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Loader from './Shared/Loader';

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
        {loading ? <Loader /> : 'App'}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </div>
  )
}
