import React from "react";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import { users } from '../Consts/user';

function SignIn(props) {

    let navigate = useNavigate();

    const [user, setUser] = useOutletContext();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => { 
        setPassword(event.target.value);
    }

    const onSubmitSignIn = (event) => {
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
        if (users[1].email === email && users[1].password === password) {
          setUser(users[1]);
          navigate('/');
        }
        else {
          alert('Wrong email or password');
        }
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
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                      className="pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address"
                      onChange={onEmailChange}
                    />
                  </div>
                  <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                      className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                      type="password" 
                      name="password"  
                      id="password"
                      onChange={onPasswordChange}
                    />
                  </div>
                </fieldset>
                <div className="">
                  <input 
                    onClick= {onSubmitSignIn}
                    className= "b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib" 
                    type= "submit" 
                    value= "Sign in"
                  />
                </div>
                <div className="lh-copy mt3">
                    <Link to="/register" className="f6 link dim black db pointer">Register</Link>
                </div>
              </form>
            </main>
        </article>
    );
}

export default SignIn;