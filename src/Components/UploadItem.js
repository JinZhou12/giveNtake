import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { users } from "../Consts/user";

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

function Upload(props) {
  let navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [size, setSize] = React.useState("");

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

  const onImageChange = (event) => {
    setImage(event.target.value);
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
    console.log("hi");
  };
  // get onSubmitSignIn() {
  //   return this._onSubmitSignIn;
  // }
  // set onSubmitSignIn(value) {
  //   this._onSubmitSignIn = value;
  // }

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="upload" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Upload Item</legend>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Image here "
                value={props.value}
                onChange={props.onChange}
              />
            </div>
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
              value="List"
            />
          </div>
          {/* <div className="lh-copy mt3">
            <Link to="/register" className="f6 link dim black db pointer">
              Register
            </Link>
          </div> */}
        </form>
      </main>
    </article>
  );
}

export default Upload;
