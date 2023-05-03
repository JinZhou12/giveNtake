import React, { useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import "../CSS/UploadItem.css";

const Description = (props) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>
          <h4 className="mb-3">Description</h4>
        </Form.Label>
        <Form.Control onChange={props.onChange} as="textarea" rows={3} />
      </Form.Group>
    </Form>
  );
};

function CreateDonation(props) {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmitItem = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/new_donation", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user.email,
        title: title,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          alert(data.err);
        } else {
          navigate("/donation");
        }
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="upload" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Start Donation</legend>
            {/* <DropBox onDrop={onDrop} />
            <ShowImage images={images} /> */}

            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="item-title">
                <h4 className="mb-3">Title</h4>
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                type="title"
                name="item-title"
                id="item-title"
                onChange={onTitleChange}
              />
            </div>

            <div className="mt3">
              <Description onChange={onDescriptionChange} />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitItem}
              className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </main>
    </article>
  );
}

export default CreateDonation;
