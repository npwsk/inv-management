import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Boards from './pages/Boards';
import Board from './pages/Board';
import Reports from './pages/Reports';
import About from './pages/About';
import Manual from './pages/Manual';
import NewBoard from './pages/NewBoard';
import Footer from './components/Footer';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Boards />} />
            <Route path="boards" element={<Boards />}>
              <Route path=":id" element={<Board />} />
              <Route path="new" element={<NewBoard />} />
            </Route>
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
