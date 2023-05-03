import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import image from "../img/Charity.png";
import "../CSS/UploadItem.css";

const Item = (props) => {
  let navigate = useNavigate();
  let photo = JSON.parse(props.item.photo).src;
  const { item, currItem, setItem } = props;

  const onSelect = () => {
    setItem(props.item.item_id);
  };

  return (
    <div
      className={
        currItem === item.item_id
          ? "bg-moon-gray item flex-column"
          : "item flex-column pointer"
      }
      onClick={onSelect}
    >
      <img className="itemimg" src={photo} alt={"nothing"} />
      <div className="flex items-center justify-center mt2 b">
        {props.item.title}
      </div>
    </div>
  );
};

function ListItem(props) {
  let navigate = useNavigate();
  const { user, item, setItem } = props;
  const [items, setItems] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/display_items", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user.email,
        gender: "",
        category: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, [user]);

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center w-100 mt3 pt2 bt">
      {!user ? (
        <div className="flex-column mt2">
          <div>Log in to see your items</div>
          <input
            onClick={onLogin}
            className="b ph3 pv2 mt3 ba b--black bg-transparent grow pointer f6 dib mr3 w-100 flex justify-center"
            type="submit"
            value="Login"
          />
        </div>
      ) : (
        <div className="flex flex-wrap overflow-y-scroll justify-center ph4">
          {Object.keys(items).map((key) => {
            return (
              <Item
                item={items[key]}
                key={key}
                setItem={setItem}
                currItem={item}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function DonationDetail() {
  let navigate = useNavigate();
  const { donationId } = useParams();
  const [user, setUser] = useOutletContext();
  const [donation, setDonation] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/donation_details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donation_id: donationId,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        setDonation(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [donationId]);

  const onUpload = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/profile/upload");
    }
  };

  const onDonate = () => {
    if (!user) {
      navigate("/login");
    } else {
      fetch("http://localhost:4000/donate_item", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donation_id: donationId,
          item_id: item,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setUser(result);
          navigate("/donation");
        });
    }
  };

  if (!donation) {
    return <div>Loading...</div>;
  }

  return (
    <div class="row">
      <div className="col-md-3 center">
        <img className="donationImg" src={image} alt={"nothing"} />
      </div>
      <h1>{donation.title}</h1>
      <div className="flex-column">
        <div className="flex justify-center items-center">
          {donation.description}
        </div>
        <div className="flex justify-center mt4">
          <input
            onClick={onDonate}
            className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib mr3"
            type="submit"
            value="Donate Item"
          />
          <input
            onClick={onUpload}
            className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Upload Item"
          />
        </div>
        <ListItem item={item} setItem={setItem} user={user} />
      </div>
    </div>
  );
}

export default DonationDetail;
