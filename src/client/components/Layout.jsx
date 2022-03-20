import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

import Header from './Header';

const Layout = () => {
  return (
    <div style={{ paddingTop: '56px' }}>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
