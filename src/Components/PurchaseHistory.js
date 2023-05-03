import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";

function GetPurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [user, setUser] = useOutletContext();

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

  console.log(purchaseHistory);
  return (
    <div>
      <h1>Purchase History</h1>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
            <th>Item Total</th>
            <th>Item Date</th>
          </tr>
        </thead>
        <tbody>
          {purchaseHistory.map((item) => (
            <tr key={item.item_id}>
              <td>{item.item_name}</td>
              <td>{item.item_price}</td>
              <td>{item.item_quantity}</td>
              <td>{item.item_total}</td>
              <td>{item.item_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetPurchaseHistory;
