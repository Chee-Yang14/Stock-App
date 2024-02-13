// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/@firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword} from "../node_modules/@firebase/auth";
import { getAnalytics } from "../node_modules/@firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA_2F27rpNONcZbIZzVwwmf_iGKRVwfd4",
  authDomain: "stock-app-3ef83.firebaseapp.com",
  projectId: "stock-app-3ef83",
  storageBucket: "stock-app-3ef83.appspot.com",
  messagingSenderId: "97376314996",
  appId: "1:97376314996:web:a8c3d8b81522889b169321",
  measurementId: "G-G8048NWSL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
//sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    //get user info

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    console.log(email, password);

    // sign up the user
   createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('didnt work', errorMessage)
    // ..
  });

})

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('user signed out')
  }).catch((err)=> {console.log(err.message)})
}) 

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
e.preventDefault()
const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

signInWithEmailAndPassword(auth, email, password).then(()=>{
  console.log('logged in')
}).catch((err)=>{
  console.log(err.message)
})
}) 