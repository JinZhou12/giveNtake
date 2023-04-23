import React from "react";
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

function Register (props){

    let navigate = useNavigate();

    const [user, setUser] = useOutletContext();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onNameChange = (event)=> {
        setName(event.target.value);
    }

    const onEmailChange = (event)=> {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event)=> { 
        setPassword(event.target.value);
    }

    const onSubmitRegister = (event)=> {
        event.preventDefault()
        // fetch('https://shrouded-plains-66034.herokuapp.com/register', {
        //     method: 'post',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //         name: this.state.name,
        //         email: this.state.email,
        //         password: this.state.password 
        //     })
        // })
        //     .then(response => response.json())
        //     .then(user => {
        //         if(user.user_id){
        //             this.props.loadUser(user);
        //             this.props.onRouteChange('home');
        //         }
        //     })
        setUser({email: email, name: name, password: password})
        navigate('/');
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
                        onChange={onNameChange}/>
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