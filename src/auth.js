import { getAuth, createUserWithEmailAndPassword } from "../node_modules/@firebase/auth";

const auth = getAuth();
//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    //get user info

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    console.log(email, password);

    // sign up the user
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

})