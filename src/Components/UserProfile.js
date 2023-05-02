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
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("123 Main St, Anytown USA");
  const [page, setPage] = useState(0);

  console.log(user);

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
              <LinkContainer to="/profile/cart">
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
            {user.charity ? (
              <Nav.Item>
                <LinkContainer to="/profile/upload">
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
      {/* <div className="fl w-75"> */}
      <Outlet context={[user, setUser]} />
      {/* </div> */}
      {/* {page === 0 ? (
        <>Xd</>
      ) : page === 1 ? (
        <>Xd2</>
      ) : page === 2 ? (
        <>Xd3</>
      ) : (
        // redirect to the UploadItem page
        <LinkContainer to="/upload">
          <Nav.Link> Click here to list an item </Nav.Link>
        </LinkContainer>
        // <>Xd4</>
      )} */}
    </div>
  );
}

export default UserProfile;
