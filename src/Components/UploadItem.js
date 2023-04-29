import React, { useEffect, useState, useCallback } from "react";
import Form from "react-bootstrap/Form";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";
import "../CSS/UploadItem.css";
import Dropdown from "../CSS/Dropdown.css";

function UploadItem(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([]);

  const GenderDropdown = () => {
    const [selectValue, setSelectValue] = useState("");
    const onChange = (event) => {
      setSelectValue(event.target.value);
    };

    return (
      <div>
        <h4 className="mb-3">Gender</h4>
        <select onChange={onChange} className="form-select">
          <option defaultValue disabled>
            Select Gender
          </option>
          <option value="Men">Men</option>
          <option value="Woman">Woman</option>
          <option value="Kid">Kid</option>
        </select>
        {selectValue && <h2 className="mt-3">{selectValue}</h2>}
      </div>
    );
  };

  const CategoryDropdown = () => {
    const [selectValue, setSelectValue] = useState("");
    const onChange = (event) => {
      setSelectValue(event.target.value);
    };
    return (
      <div>
        <h4 className="mb-3">Category</h4>
        <select onChange={onChange} className="form-select">
          <option defaultValue disabled>
            Select Category
          </option>
          <option value="Clothing"> Clothing</option>
          <option value="Shoes"> Shoes</option>
        </select>
        {selectValue && <h2 className="mt-3">{selectValue}</h2>}
      </div>
    );
  };
  const SizeCheckBox = () => {
    const [selectValue, setSelectValue] = useState("");
    const onChange = (event) => {
      setSelectValue(event.target.value);
    };

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
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="S"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check inline label="M" type={type} id={`inline-${type}-3`} />
            <Form.Check inline label="L" type={type} id={`inline-${type}-4`} />
            <Form.Check inline label="XL" type={type} id={`inline-${type}-5`} />
          </div>
        ))}
      </Form>
    );
  };

  const ConditionCheckBox = () => {
    const [selectValue, setSelectValue] = useState("");
    const onChange = (event) => {
      setSelectValue(event.target.value);
    };

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
              name="group1"
              type={type}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="Like New"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="Good"
              type={type}
              id={`inline-${type}-3`}
            />
            <Form.Check
              inline
              label="Fair"
              type={type}
              id={`inline-${type}-4`}
            />
            <Form.Check
              inline
              label="Poor"
              type={type}
              id={`inline-${type}-5`}
            />
          </div>
        ))}
      </Form>
    );
  };

  const Description = () => {
    const [selectValue, setSelectValue] = useState("");
    const onChange = (event) => {
      setSelectValue(event.target.value);
    };
    return (
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <h4 className="mb-3">Description</h4>
          </Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    );
  };

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

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onPriceChange = (event) => {
    setPrice(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmitItem = (event) => {
    event.preventDefault();
    // fetch('https://shrouded-plains-66034.herokuapp.com/signin', {
    //     method: 'post',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         email: this.state.signInEmail,
    //         password: this.state.signInPassword
    //     })
    // })
    //     .then(response => response.json())
    //     .then(user => {
    //         if(user.user_id){
    //             this.props.loadUser(user);
    //             this.props.onRouteChange('home');
    //         }
    //     })
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
              <Description />
            </div>

            <div className="container mt3">
              <GenderDropdown />
            </div>

            <div className="container mt3">
              <CategoryDropdown />
            </div>

            <div className="container mt3">
              <SizeCheckBox />
            </div>

            <div className="container mt3">
              <ConditionCheckBox />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="category">
                Price
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                type="price"
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
