import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../CSS/Navigation.css"

const Navigation = () =>  {
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="#home">Give&Take</Navbar.Brand>
        <Nav className='ms-auto'>
          <Nav.Link href="#profile">Profile</Nav.Link>
        </Nav>
      </Navbar>
    )
}

export default Navigation;