import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

function Register (props){

    let navigate = useNavigate();

    const [user, setUser] = useOutletContext();
    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const onUsernameChange = (event)=> setuserName(event.target.value);

    const onEmailChange = (event)=> setEmail(event.target.value);

    const onPasswordChange = (event)=> setPassword(event.target.value);

    const onPassword2Change = (event)=> setPassword2(event.target.value);

    const onSubmitRegister = (event)=> {
        event.preventDefault()
        fetch('https://localhost:4000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password2: password2
            })
        })
            .then(response => response.json())
            .then(res => {
                if (res.err){
                    console.log(res.err);
                } else {
                    setUser(res);
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className=''>
          <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
              <form className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input 
                      className="pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                      type="text" 
                      name="name"  
                      id="name"
                      onChange={onUsernameChange}/>
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input 
                      className="pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address"
                      onChange={onEmailChange}/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input 
                      className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                      type="password" 
                      name="password"  
                      id="password"
                      onChange={onPasswordChange}/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password2">Re-enter Password</label>
                  <input 
                      className="b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                      type="password" 
                      name="password2"  
                      id="password2"
                      onChange={onPassword2Change}/>
                </div>
              </fieldset>
                <div className="">
                  <input 
                  onClick= {onSubmitRegister}
                  className= "b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                  type= "submit" 
                  value= "Register"
                  />
                </div>
              </form>
            </main>
          </article>
        </div>
    );
}

export default Register;