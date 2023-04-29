import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";
import "../CSS/UploadItem.css";

function PersonalInfo() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("123@gmail.com");

  return (
    <Form>
      <Form.Group calssName="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Username" />
      </Form.Group>

      <Form.Group calssName="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="setEmail" disabled/>
      </Form.Group>


    </Form>
    
  );
}

export default PersonalInfo;
