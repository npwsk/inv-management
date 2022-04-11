import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getBoards } from './actions/board.js';
import { getLocations } from './actions/location.js';
import { getStaffMembers } from './actions/staff.js';

import Button from 'react-bootstrap/Button';
import BoardsRouting from './pages/BoardsRouting';
import Reports from './pages/Reports';
import About from './pages/About';
import Manual from './pages/Manual';
import Footer from './components/Footer';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
    dispatch(getLocations());
    dispatch(getStaffMembers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BoardsRouting />} />
            <Route path="boards/*" element={<BoardsRouting />} />
            <Route path="reports" element={<Reports />} />
            <Route path="about" element={<About />} />
            <Route path="manual" element={<Manual />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
