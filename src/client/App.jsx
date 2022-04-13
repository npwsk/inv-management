import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BoardsRouting from './pages/boards/BoardsRouting';
import Reports from './pages/Reports';
import AboutApp from './pages/AboutApp';
import Manual from './pages/Manual';
import Footer from './components/Footer';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Locations from './pages/locations/Locations';
import Location from './pages/locations/Location';
import NewLocation from './pages/locations/NewLocation';
import StaffMember from './pages/staff/StaffMember';
import NewStaff from './pages/staff/NewStaff';
import StaffList from './pages/staff/StaffList';

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<BoardsRouting />} />
            <Route path="boards/*" element={<BoardsRouting />} />
            <Route path="locations">
              <Route path=":id" element={<Location />} />
              <Route path="new" element={<NewLocation />} />
              <Route index element={<Locations />} />
            </Route>
            <Route path="staff">
              <Route path=":id" element={<StaffMember />} />
              <Route path="new" element={<NewStaff />} />
              <Route index element={<StaffList />} />
            </Route>
            <Route path="reports" element={<Reports />} />
            <Route path="about-app" element={<AboutApp />} />
            <Route path="about-developer" element={<AboutApp />} />
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
