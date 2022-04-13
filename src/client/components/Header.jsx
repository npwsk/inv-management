import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

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
              <LinkContainer to="/boards">
                <Nav.Link>Устройства</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/staff">
                <Nav.Link>Сотрудники</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/locations">
                <Nav.Link>Локации</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/reports">
                <Nav.Link>Отчеты</Nav.Link>
              </LinkContainer>
            </Nav>

            <Nav>
              <NavDropdown title="Справка" id="basic-nav-dropdown">
                <LinkContainer to="/about-app">
                  <NavDropdown.Item>О приложении</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item href="/manual.pdf" download>
                  Руководство
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
