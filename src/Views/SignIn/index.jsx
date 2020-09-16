import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { SignInCall } from '../../Firebase/auth';
import icon from '../../logo.svg'
import { auth } from '../../Firebase/auth'

class SignIn extends Component {
  componentDidMount(){
    auth.onAuthStateChanged(user =>{
      if(user){
        window.location.replace('/dashboard')    
        console.log(user);
      }
    })
  }
  render() {
    return (
      <div className="container-fluid" >
        <nav>
          <div className="nav-wrapper" style={{background: 'black'}}>
            <a href="#!" className="brand-logo">
              <img className="App-logo" src={icon} alt="" />
            </a>
          </div>
        </nav>
        <div className="row" style={{marginTop: 50}} >
          <div className="col s12 offset-m3 m6 offset-l4 l4" >
            <form className="col s12" style={styleBox.form}>
              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}}>
                  <input id="login-email" type="email" className="validate" required={true} />
                  <label htmlFor="login-email">Email</label>
                  <span className="helper-text" data-error="Please Enter the correct Format of email !"></span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" style={{margin: 0, padding: 0}} >
                  <input id="login-pass" type="password" className="validate" required={true}/>
                  <label htmlFor="login-pass">Password</label>
                  <span className="helper-text" data-error="Password is required !"></span>
                </div>
              </div>
              <div className="row">
                <button className="btn waves-effect waves-light col s12 m12 l12"  onClick={SignInCall} type="submit" name="action">SIGN IN
                  <i className="material-icons right">send</i>
                </button>
              </div>
              <div className='row' >Don't have an account? <Link to='sign-up' >Sign Up</Link> here</div>

           </form>
          </div>
        </div>
      </div>
    );
  }
}
const styleBox = {
  form: {
    textAlign: 'center',
    marginTop: 10,
  }
}
export default SignIn;