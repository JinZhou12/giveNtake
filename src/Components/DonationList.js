import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../img/Charity.png";
import "../CSS/DonationList.css";

const Donation = (props) => {
  let navigate = useNavigate();
  const donation = props.donation;

  const getDetail = () => {
    navigate(`/donation_detail/${props.donation.donation_id}`);
  };

  return (
    <div className="flex donation" onClick={getDetail}>
      <div className="flex w-100 h-100">
        <div
          className="donateImg"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
          }}
        />
        <div className="flex-column w-50">
          <div className="flex w-100 h-100 h3 justify-center items-center">
            {donation.name}
          </div>
        </div>
      </div>
      {/* <img src={props.item.img} alt={'nothing'} width='100%' height='200'/>
          <div>{props.item.name}</div>
          <div>${props.item.price}</div> */}
    </div>
  );
};

const DonationList = (props) => {
  // const donations = props.donations;
  const [donations, setDonations] = React.useState("");

  useState(() => {
    fetch("http://localhost:4000/display_donations", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setDonations(data);
      });
  }, []);

  return (
    <div className="flex-column donationList">
      {Object.keys(donations).map((key) => (
        <Donation donation={donations[key]} key={key} />
      ))}
    </div>
  );
};

export default DonationList;
