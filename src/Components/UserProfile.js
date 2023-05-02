import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/Dashboard.css";

function UserProfile() {
  const [user, setUser] = useOutletContext();
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("123 Main St, Anytown USA");

  return (
    <div className="profile-page flex">
      <div className="fl w-25">
        <Nav>
          <div className="sidebar-sticky flex-column">
            <Nav.Item>
              <LinkContainer to="/profile">
                <Nav.Link>Personal Information</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/profile/shopping_cart">
                <Nav.Link>Shopping Cart</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/profile/history">
                <Nav.Link>History</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/profile/upload">
                <Nav.Link> Listing </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </div>
        </Nav>
      </div>
      <Outlet context={[user, setUser]} />
    </div>
  );
}

export default UserProfile;
