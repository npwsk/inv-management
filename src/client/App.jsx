import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Boards from './pages/Board';
import Board from './pages/Board';
import Reports from './pages/Reports';
import About from './pages/About';
import Manual from './pages/Manual';
import NewBoard from './pages/NewBoard';
import Footer from './components/Footer';
import Layout from './components/Layout';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact path="/boards" element={<Boards />}>
              <Route path=":id" element={<Board />} />
              <Route path="new" element={<NewBoard />} />
            </Route>
            <Route exact path="/reports" element={<Reports />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/manual" element={<Manual />} />
            <Route index element={<Boards />} />
          </Route>
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export default App;
