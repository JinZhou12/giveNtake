import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import "../CSS/Categories.css";

const Categories = () => {
  return (
    <div className="categories">
      <Navbar bg="lg" variant="lg">
        <Nav className="me-auto">
          <NavDropdown title="Clothing" id="basic-nav-dropdown">
            <NavDropdown.Item href="#clothing/men">
              Men's Clothing
            </NavDropdown.Item>
            <NavDropdown.Item href="#clothing/women">
              Women's Clothing
            </NavDropdown.Item>
            <NavDropdown.Item href="#clothing/kids">
              Kids Clothing
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Shoes" id="basic-nav-dropdown">
            <NavDropdown.Item href="#shoes/men">Men's Shoes</NavDropdown.Item>
            <NavDropdown.Item href="#shoes/women">
              Women's Shoes
            </NavDropdown.Item>
            <NavDropdown.Item href="#shoes/kids">Kids Shoes</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="searchBar">
          <Form.Control placeholder="Search" />
        </Form>
      </Navbar>
    </div>
  );
};

export default Categories;
