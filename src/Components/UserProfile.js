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
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("123 Main St, Anytown USA");
  const [page, setPage] = useState(0);

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission
  }

  return (
    <div className="profile-page flex">
      <div className="fl w-25">
        <Nav>
          <div className="sidebar-sticky flex-column">
            <Nav.Item>
              <LinkContainer to="/profile/info">
                {/* <Nav.Link
                  onClick={() => {
                    setPage(0);
                  }}
                /> */}
                <Nav.Link>Personal Information</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setPage(1);
                }}
              >
                Shopping Cart
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                onClick={() => {
                  setPage(2);
                }}
              >
                History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/profile/upload">
                <Nav.Link> Listing </Nav.Link>
              </LinkContainer>
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
