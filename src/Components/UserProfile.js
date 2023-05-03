import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { NavLink, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "../CSS/Dashboard.css";

function UserProfile() {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  // console.log(user);

  const onShoppingCartClick = () => {
    navigate("/profile/shopping_cart/${user.email}");
  };

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
              <LinkContainer to="/profile/address">
                <Nav.Link>Address</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              {/* <LinkContainer to="/profile/shopping_cart/:"> */}
              <Nav.Link onClick={onShoppingCartClick}>Shopping Cart</Nav.Link>
              {/* </LinkContainer> */}
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
            {user.charity ? (
              <Nav.Item>
                <LinkContainer to="/profile/donation">
                  <Nav.Link> Start Donation </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ) : (
              <></>
            )}
            <Nav.Item>
              <Nav.Link
                className="red mt2"
                onClick={() => {
                  setUser("");
                  navigate("/");
                }}
              >
                Logout
              </Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
      </div>
      <Outlet context={[user, setUser]} />
    </div>
  );
}

export default UserProfile;
