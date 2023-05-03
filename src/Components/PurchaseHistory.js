import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function GetPurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [user, setUser] = useOutletContext();
  const [rating, setRating] = React.useState(5);
  //   const [rateLock, setRateLock] = React.useState(false);

  //   console.log(user.email);

  useEffect(() => {
    fetch("http://localhost:4000/purchase_history", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          alert(`Error:${data.err}`);
        } else {
          setPurchaseHistory(data);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error fetching purchase history");
      });
  }, []);

  //   console.log(purchaseHistory);

  const addRating = (rating, purchase_id) => {
    try {
      fetch("http://localhost:4000/add_rating", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          purchase_id: purchase_id,
          rating: rating,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            alert(data.err);
          } else {
            alert("Rating added");
          }
        });
    } catch (err) {
      console.error("Error:", err);
      alert("Error adding rating");
    }
  };

  return (
    <div>
      {purchaseHistory.length === 0 ? (
        <div>
          <h1>No purchase history</h1>
        </div>
      ) : (
        <div>
          <h1>Purchase History</h1>
          {Object.keys(purchaseHistory).map((key) => {
            return (
              <div>
                <div>Item ID: {purchaseHistory[key].item_id}</div>
                <div>Purchase ID: {purchaseHistory[key].purchase_id}</div>
                <div>Title: {purchaseHistory[key].title}</div>
                <div>Price: {purchaseHistory[key].price}</div>
                <div>Size: {purchaseHistory[key].size}</div>
                <div>Condition: {purchaseHistory[key].condition}</div>
                <div>
                  <Typography component="legend">Add Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, rating) => {
                      setRating(rating);
                    }}
                  />
                </div>

                <div className="mt3">
                  <input
                    onClick={() =>
                      addRating(rating, purchaseHistory[key].purchase_id)
                    }
                    className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Submit"
                  />
                </div>

                {/* <div>Purchase Time: {purchaseHistory[key].time}</div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GetPurchaseHistory;
