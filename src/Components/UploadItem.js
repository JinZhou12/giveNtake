import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { users } from "../Consts/user";
import DropBox from "./DropBox";
import ShowImage from "./ShowImage";
import "../CSS/UploadItem.css";

// function Image(props) {
//   const [image, setImage] = React.useState(null);

//   const onImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

//   const onSubmitImage = (event) => {
//     event.preventDefault();
//     console.log(image);
//   };

//   return (
//     <div className="form-group">
//       <label htmlFor="image">Image</label>
//       <input
//         type="text"
//         className="form-control"
//         id="image"
//         placeholder="Enter image URL"
//         value={props.value}
//         onChange={props.onChange}
//       />
//     </div>
//   );
// }

function UploadItem(props) {
  let navigate = useNavigate();

  const [user, setUser] = useOutletContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");

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

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
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
                Title
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black w-100"
                type="title"
                name="item-title"
                id="item-title"
                onChange={onTitleChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="description">
                Description
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                type="description"
                name="description"
                id="description"
                onChange={onDescriptionChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="category">
                Category
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                type="category"
                name="category"
                id="catrgory"
                onChange={onCategoryChange}
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
