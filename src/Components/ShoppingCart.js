import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Button } from "react-bootstrap";

function ShoppingCart() {
  const [cartItems, setCartItems] = React.useState([]);
  const [user, setUser] = useOutletContext();

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

  //   console.log(cartItems);

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

  console.log(cartItems);

  const onClickPurchase = async (user_email,item_id) => {
    try {
      const response = await fetch("http://localhost:4000/purchase", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user_email,
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



  return (
    <div className="flex-column">
      {cartItems.length === 0 ? (
        <div>
          <h4> Add item to the cart</h4>
        </div>
      ) : (
        <div>
          {Object.keys(cartItems).map((key) => {
            return (
              <div>
                <div className="col-md-3 left">
                  <img
                    className="itemimg"
                    src={JSON.parse(cartItems[key].photo).src}
                    alt={"nothing"}
                    width="100%"
                    height="200%"
                  />
                </div>
                <div>{cartItems[key].title}</div>
                <div>{cartItems[key].price}</div>
                <div>{cartItems[key].condition}</div>
                <div>{cartItems[key].size}</div>
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
            );
          })}
          <div className="">
            <input
              // onClick={() => {
              //   deletItemFromCart(cartItems[key].item_id);
              // }}
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
