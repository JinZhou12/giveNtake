import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/Navigation.css";

const Navigation = (props) => {
  const [user, setUser] = useState("");
  console.log(user);

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <LinkContainer to="/">
          <Navbar.Brand> Give&Take </Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link> Personal </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/donation">
            <Nav.Link> Donation </Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav className="ms-auto">
          {user ? (
            <>
              <LinkContainer to="/cart">
                <Nav.Link> Shopping Cart </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/profile">
                <Nav.Link> Profile </Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link> Login </Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar>
      <Outlet context={[user, setUser]} />
    </>
  );
};

export default Navigation;
