import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "../CSS/Navigation.css";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Navbar.Brand as={Link} to="/">
        Give&Take
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="personal">
          Personal
        </Nav.Link>
        <Nav.Link as={Link} to="donation">
          Donation
        </Nav.Link>
      </Nav>
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="profile">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
