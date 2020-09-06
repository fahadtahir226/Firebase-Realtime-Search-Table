import firebase from "./firebase"
// import { db } from './firestore';

export const auth = firebase.auth();

export const SignUpCall = (e) => {
  e.preventDefault();

  var name = document.getElementById('reg-username').value;
  var email = document.getElementById("reg-email").value;
  var pass = document.getElementById("reg-pass").value;
  if ((name.length && email.length)) {
    auth.createUserWithEmailAndPassword(email, pass)
    .then((res) => {
      auth.currentUser.updateProfile({displayName: name});
      // let uid = res.user.uid;

      // db.collection('users').doc(res.user.uid).set({name,email,uid, type: "unassigned"})
      // .then(() => {
        console.log('User Added')
        window.location.replace('/dashboard');
      // })
    })
    .catch((err) => {
      alert(err)
    })

  } 
  else {
    console.log('Every Field is Mandatory!')
  }
}

// User login 
export const SignInCall = (e, addError) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    auth.signInWithEmailAndPassword(email, pass)
    .then( res => {
      if (res) {
        console.log(res.user.uid);
        // db.collection('users').doc(res.user.uid).get()
        // .then(res => {
        //   console.log(res.data())
        //   if(res.data().type === 'unassigned') window.location.replace("/dashboard/user");
        //   else if(res.data().type === 'admin') window.location.replace("/dashboard/admin");
        // })
        window.location.replace('dashboard')

        console.log(auth.currentUser);
      }
    }) 
    .catch((err) => {
      // let error = {message: err.message}
      // error.status = 'danger';
      console.log('Every Field is Mandatory!')
    });

}

// User Sign Out
export const SignOut = () => {
    auth.signOut()
    .then(res => {
      window.location.replace("/");
    }).catch(err => {
        console.log(err);
    })
}
