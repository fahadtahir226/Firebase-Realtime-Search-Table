import firebase from "firebase"
import { auth } from './auth'
// import { db } from './firestore';

export const googleLogin = (event) => {
  event.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(function (result) {

      // db.collection('users').doc(result.user.uid).get().then(res =>{
      //   if(!res.exists){
      //     console.log(result.user);
      //     db.collection('users').doc(result.user.uid).set({uid: result.user.uid, email: result.user.email, type: "Unassigned"})
      //     .then(() => {
            window.location.replace('/dashboard');
            // console.log("User Added to db sucessfully")
          // })
          // .catch(err => console.log(err));
        // }
        // else{
        //   if(res.data().type === 'Unassigned'){
        //     window.location.replace('/dashboard/main');
        //     console.log("Unassigned Exists so logged in: ", result.user)
        //   }
        //   else if( res.data().type === 'Admin'){
        //     window.location.replace('/dashboard/main');
        //     console.log("Admin Exists so logged in: ", result.user)
        //   }
        // }
      // })
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        console.log(errorCode, errorMessage);
        // ...
    });
}