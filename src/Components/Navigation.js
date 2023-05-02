import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/Navigation.css";

const Navigation = (props) => {
  const [user, setUser] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");

  return (
    <>
      <Navbar className="mb3" bg="dark" variant="dark" sticky="top">
        <LinkContainer to="/">
          <Navbar.Brand
            onClick={() => {
              setCategory("");
              setGender("");
            }}
          >
            Give&Take
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ms-auto">
          <LinkContainer to="/">
            <Nav.Link
              onClick={() => {
                setCategory("");
                setGender("");
              }}
            >
              Personal
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/donation">
            <Nav.Link> Donation </Nav.Link>
          </LinkContainer>
          {user ? (
            <>
              <LinkContainer to="/profile/shopping_cart">
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
      <Outlet
        context={[user, setUser, category, setCategory, gender, setGender]}
      />
    </>
  );
};

export default Navigation;
