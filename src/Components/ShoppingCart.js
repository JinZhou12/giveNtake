import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function ShoppingCart() {
  let navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useOutletContext();
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/getCart?user_email=${user.email}`,
        {
          method: "get",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (data.error) {
        console.log(data.error);
      } else {
        setCartItems(data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error: " + err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += Number(cartItems[i].price);
    }
    setTotal(total);
  }, [cartItems]);

  const deletItemFromCart = async (item_id) => {
    try {
      const response = await fetch("http://localhost:4000/deleteCartItem", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          item_id: item_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.err) {
            console.log(data.err);
          } else {
            fetchCartItems();
          }
        });
    } catch (err) {
      console.error("Error:", err);
      alert("Error deleting item from cart");
    }
  };

  const onClickPurchase = async () => {
    let hasError = false;

    for (let i = 0; i < cartItems.length; i++) {
      const error = await Purchase(cartItems[i].item_id, total);
      if (error) {
        console.log("out");
        hasError = true;
        break;
      }
    }

    console.log(hasError);
    if (!hasError) {
      fetchCartItems();
      navigate("/");
    }
  };

  async function Purchase(item_id, total) {
    try {
      const response = await fetch("http://localhost:4000/purchase", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          item_id: item_id,
          total: total,
        }),
      });

      const data = await response.json();

      if (data.err) {
        alert(data.err);
        return true;
      } else {
        setUser(data);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <div className="flex-column w-75">
      {cartItems.length === 0 ? (
        <div>
          <h4> Add item to the cart</h4>
        </div>
      ) : (
        <div>
          {Object.keys(cartItems).map((key) => {
            return (
              <div className="flex ba b--silver br2 w-80 mb3">
                <div className="">
                  <img
                    className="itemimg"
                    src={JSON.parse(cartItems[key].photo).src}
                    alt={"nothing"}
                    width="100%"
                    height="200%"
                  />
                </div>
                <div className="flex-column w-100 mt4">
                  <div className="flex justify-between pr4 ">
                    <div className="b">{cartItems[key].title}</div>
                    <div>{cartItems[key].price}</div>
                  </div>
                  <div>Condition: {cartItems[key].condition}</div>
                  <div className="mb3">Size: {cartItems[key].size}</div>
                  <div className="">
                    <input
                      onClick={() => {
                        deletItemFromCart(cartItems[key].item_id);
                      }}
                      className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"
                      type="submit"
                      value="Delete"
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div>Total: {total}</div>
          <div className="mt3">
            <input
              onClick={() => {
                onClickPurchase();
              }}
              className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Purchase"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
