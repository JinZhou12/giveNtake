import React, { useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { useOutletContext } from "react-router-dom";
import "../CSS/Categories.css";

function Categories() {
  const [user, setUser, category, setCategory, gender, setGender] =
    useOutletContext();

  return (
    <div className="categories">
      <Navbar bg="lg" variant="lg">
        <Nav className="me-auto">
          <NavDropdown title="Clothing" id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => {
                setCategory("Clothing");
                setGender("");
              }}
            >
              All Clothing
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setCategory("Clothing");
                setGender("Men");
              }}
            >
              Men's Clothing
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setCategory("Clothing");
                setGender("Women");
              }}
            >
              Women's Clothing
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setCategory("Clothing");
                setGender("Kid");
              }}
            >
              Kids Clothing
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Shoes" id="basic-nav-dropdown">
            <NavDropdown.Item
              onClick={() => {
                setCategory("Shoes");
                setGender("");
              }}
            >
              All Shoes
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setCategory("Shoes");
                setGender("Men");
              }}
            >
              Men's Shoes
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setCategory("Shoes");
                setGender("Women");
              }}
            >
              Women's Shoes
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setCategory("Shoes");
                setGender("Kid");
              }}
            >
              Kids Shoes
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="searchBar">
          <Form.Control placeholder="Search" />
        </Form>
      </Navbar>
    </div>
  );
}

export default Categories;
