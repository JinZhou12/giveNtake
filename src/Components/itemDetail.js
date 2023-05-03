import React from "react";
import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "../CSS/UploadItem.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

function ItemDetail() {
  let navigate = useNavigate();
  const [user, setUser] = useOutletContext();
  const { itemId } = useParams();
  const [item, setItem] = useState("");

  // console.log(user);

  const onCartClick = async () => {
    
    try {
      const response = await fetch("http://localhost:4000/cart", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          item_id: item.item_id,
        }),
      });

      const data = await response.json();
      if (data.err) {
        alert("Error:${data.message}");
      } else {
        alert(data.message);
      }
    } catch (err) {
      // console.log(err);
      console.error("Error:", err);
      alert("Error adding to cart");
    }
  };

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      item_id: itemId,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:4000/item_details", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setItem(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [itemId]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div class="row">
      <div className="col-md-3 center">
        <img
          className="itemimg"
          src={JSON.parse(item.photo).src}
          alt={"nothing"}
          width="100%"
          height="200%"
        />
      </div>
      <h1>{item.title}</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={item.description} />
          </Col>

          <Form.Label column sm="2">
            Price
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={"$" + item.price} />
          </Col>

          <Form.Label column sm="2">
            Condition
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={item.condition} />
          </Col>

          <Form.Label column sm="2">
            Size
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={item.size} />
          </Col>

          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={item.category} />
          </Col>

          <Form.Label column sm="2">
            Status
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={item.item_status} />
          </Col>
        </Form.Group>

        <Form.Label column sm="2">
          Add to shopping cart
        </Form.Label>
        <IconButton color="primary" aria-label="add to shopping cart">
          <AddShoppingCartIcon onClick={onCartClick} />
        </IconButton>
      </Form>
    </div>
  );
}

export default ItemDetail;
