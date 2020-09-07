import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { SignInCall } from '../../Firebase/auth';
import { googleLogin } from '../../Firebase/google';
import icon from '../../logo.svg'

class SignIn extends Component {
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
              <div className='row' style={{marginTop: 50}} >
                <div className='col s2 m3 l3' style={{paddingRight: 0}}><div className="divider" style={{marginTop: 10}} ></div></div>
                <div className='col s8 m6 l6' style={{paddingLeft: 5, paddingRight: 5, color: 'dimgray'}} >OR LOGIN WITH YOUR SOCIAL MEDIA</div> 
                <div className='col s2 m3 l3' style={{paddingLeft: 0}} ><div className="divider" style={{marginTop: 10}} ></div></div>
              </div>
              <div class="row">              
                <div class="col s12 m12 l12" style={{marginTop: 10}}>
                  <button 
                    class="black white-text col s12 m12 l12 btn waves-effect waves-light" 
                    onClick={googleLogin} name="action">
                    Google
                    <i class="fa fa-google left"  style={{fontSize:24}}></i>
                    <i class="material-icons right">send</i>
                  </button>
                </div>
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