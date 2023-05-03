import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const EditAddress = (props) => {
  let navigate = useNavigate();
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    setAddr1(props.addr1);
    setAddr2(props.addr2);
    setState(props.state);
    setCity(props.city);
    setZip(props.zip);
  }, [props.addr1, props.addr2, props.state, props.city, props.zip]);

  const onAddr1Change = (e) => {
    setAddr1(e.target.value);
  };
  const onAddr2Change = (e) => {
    setAddr2(e.target.value);
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onStateChange = (e) => {
    setState(e.target.value);
  };
  const onZipChange = (e) => {
    setZip(e.target.value);
  };

  const onSubmit = () => {
    if (!props.exist) {
      fetch("http://localhost:4000/add_addr", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: props.user.email,
          addr1: addr1,
          addr2: addr2,
          city: city,
          state: state,
          zip: zip,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.err) {
            alert(data.err);
          } else {
            // props.setAddress(data);
          }
        });
    } else {
      fetch("http://localhost:4000/edit_addr", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: props.user.email,
          addr1: addr1,
          addr2: addr2,
          city: city,
          state: state,
          zip: zip,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.err) {
            alert(data.err);
          } else {
            // props.setAddress(data);
          }
        });
    }
    navigate("/profile/address");
  };

  return (
    <Form>
      <Form.Group className="mb-3 b" controlId="formAddr1">
        <Form.Label>Address 1</Form.Label>
        <Form.Control
          type="address1"
          value={addr1}
          onChange={onAddr1Change}
          placeholder="Address 1"
        />
      </Form.Group>

      <Form.Group className="mb-3 b" controlId="formAddr2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control
          type="address2"
          value={addr2}
          onChange={onAddr2Change}
          placeholder="Address 2"
        />
      </Form.Group>

      <Form.Group className="mb-3 b" controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="city"
          value={city}
          onChange={onCityChange}
          placeholder="City"
        />
      </Form.Group>

      <Form.Group className="mb-3 b" controlId="formState">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="state"
          value={state}
          onChange={onStateChange}
          placeholder="State"
        />
      </Form.Group>

      <Form.Group className="mb-3 b" controlId="formZip">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control
          type="number"
          value={zip}
          onChange={onZipChange}
          placeholder="Zip Code"
        />
      </Form.Group>

      <input
        onClick={onSubmit}
        className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
        value="Submit"
      />
    </Form>
  );
};

function Address() {
  const [user, setUser, category, setCategory, gender, setGender] =
    useOutletContext();
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/get_addr", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddress(data);
      });
  }, [user]);

  return (
    <div>
      {!address ? (
        <div>
          <div className="b mb3 f2">Add New Address</div>
          <EditAddress
            user={user}
            addr1={""}
            addr2={""}
            city={""}
            state={""}
            zip={""}
            exist={false}
            setAddress={setAddress}
            setUser={setUser}
          />
        </div>
      ) : (
        <div>
          <div className="b mb3 f2">Edit Address</div>
          <EditAddress
            user={user}
            addr1={address.address1}
            addr2={address.address2}
            city={address.city}
            state={address.state}
            zip={address.zip_code}
            exist={true}
            setAddress={setAddress}
            setUser={setUser}
          />
        </div>
      )}
    </div>
  );
}

export default Address;
