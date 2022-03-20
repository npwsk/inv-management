import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Главная</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/reports">
                <Nav.Link>Сформировать отчет</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav>
              <LinkContainer to="/about">
                <Nav.Link>Справка</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/manual">
                <Nav.Link>Руководство</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
