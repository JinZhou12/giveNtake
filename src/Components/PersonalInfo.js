import React from "react";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useOutletContext } from "react-router-dom";
import "../CSS/UploadItem.css";

function PersonalInfo() {
  const [user, setUser] = useOutletContext();

  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
        <Form.Label column sm="5">
          Username
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={user.username} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={user.email} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="3">
          Credit
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={user.credit} />
        </Col>
      </Form.Group>

      {/* <Form.Group calssName="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="setEmail" disabled/>
      </Form.Group> */}
    </Form>
  );
}

export default PersonalInfo;
