import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="success" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <h1>FYR</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" exact activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search" exact activeClassName="active">
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} to="/browse" exact activeClassName="active">
              Browse
            </Nav.Link>
            <Nav.Link as={NavLink} to="/saved" exact activeClassName="active">
              Saved
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
