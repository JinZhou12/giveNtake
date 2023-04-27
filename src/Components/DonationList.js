import React from "react";
import image from "../img/Charity.png";
import "../CSS/DonationList.css";

const Donation = (props) => {
  const donation = props.donation;

  return (
    <div
      className="fr donation"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "contain" }}
    >
      <div> {donation.title}</div>
      {/* <img src={props.item.img} alt={'nothing'} width='100%' height='200'/>
          <div>{props.item.name}</div>
          <div>${props.item.price}</div> */}
    </div>
  );
};

const DonationList = (props) => {
  const donations = props.donations;

  return (
    <div className="fc donationList">
      {Object.keys(donations).map((key) => (
        <Donation donation={donations[key]} key={key} />
      ))}
    </div>
  );
};

export default DonationList;
