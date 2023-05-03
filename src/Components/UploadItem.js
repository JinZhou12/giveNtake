import React, { useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Dropdown from "../CSS/Dropdown.css";
import "../CSS/UploadItem.css";

const GenderDropdown = (props) => {
  return (
    <div>
      <h4 className="mb-3">Gender</h4>
      <select onChange={props.onChange} className="form-select">
        <option defaultValue disabled>
          Select Gender
        </option>
        <option value="Men">Men</option>
        <option value="Woman">Women</option>
        <option value="Kid">Kid</option>
      </select>
    </div>
  );
};

const CategoryDropdown = (props) => {
  return (
    <div>
      <h4 className="mb-3">Category</h4>
      <select onChange={props.onChange} className="form-select">
        <option defaultValue disabled>
          Select Category
        </option>
        <option value="Clothing"> Clothing</option>
        <option value="Shoes"> Shoes</option>
      </select>
      {/* {category} */}
    </div>
  );
};

const SizeCheckBox = (props) => {
  return (
    <Form>
      <label>
        <h4 className="mb-3">Size</h4>
      </label>
      {["radio"].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="XS"
            name="group1"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="S"
            name="group1"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="M"
            name="group1"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-3`}
          />
          <Form.Check
            inline
            label="L"
            name="group1"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-4`}
          />
          <Form.Check
            inline
            label="XL"
            name="group1"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-5`}
          />
        </div>
      ))}
    </Form>
  );
};

const ConditionCheckBox = (props) => {
  return (
    <Form>
      <label>
        <h4 className="mb-3">Condition</h4>
      </label>
      {["radio"].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="New"
            name="group2"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-6`}
          />
          <Form.Check
            inline
            label="Like New"
            name="group2"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-7`}
          />
          <Form.Check
            inline
            label="Good"
            name="group2"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-8`}
          />
          <Form.Check
            inline
            label="Fair"
            name="group2"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-9`}
          />
          <Form.Check
            inline
            label="Poor"
            name="group2"
            type={type}
            onClick={props.onChange}
            id={`inline-${type}-10`}
          />
        </div>
      ))}
    </Form>
  );
};

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

function UploadItem(props) {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("Men");
  const [category, setCategory] = useState("Clothing");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onPriceChange = (event) => {
    setPrice(event.target.value);
  };

  const onGenderChange = (event) => {
    setGender(event.target.value);
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSizeChange = (event) => {
    setSize(event.target.labels[0].innerText);
  };

  const onConditionChange = (event) => {
    setCondition(event.target.labels[0].innerText);
  };

  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [{ id: index, src: e.target.result }]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const onSubmitItem = (event) => {
    event.preventDefault();
    // console.log(size);
    // console.log(condition);
    if (!images.length) {
      alert("Please upload an image");
      return;
    }
    fetch("http://localhost:4000/list_items", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user.email,
        title: title,
        price: price,
        photo: images[0],
        gender: gender,
        category: category,
        size: size,
        condition: condition,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          alert(data.err);
        } else {
          alert("success");
          navigate("/profile");
        }
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="upload" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Upload Item</legend>
            <DropBox onDrop={onDrop} />
            <ShowImage images={images} />

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

            <div className="mt3">
              <GenderDropdown onChange={onGenderChange} />
            </div>

            <div className="mt3">
              <CategoryDropdown onChange={onCategoryChange} />
            </div>

            <div className="mt3">
              <SizeCheckBox onChange={onSizeChange} />
            </div>

            <div className="mt3">
              <ConditionCheckBox onChange={onConditionChange} />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="category">
                Price
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                type="number"
                name="price"
                id="price"
                onChange={onPriceChange}
              />
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

export default UploadItem;
