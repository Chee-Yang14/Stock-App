// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/@firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,onAuthStateChanged} from "../node_modules/@firebase/auth";
import {getFirestore, doc, setDoc, getDoc} from "../node_modules/@firebase/firestore"
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
const auth = getAuth(app);
const db = getFirestore(app); 

//redirect after log-in
function redirectToDashboard() {
  window.location.href = 'dashboard.html'; 
}

function logout() {
  window.location.href = 'index.html'; 
}

//sign up
const signupForm = document.querySelector('#signup-form');

signupForm?.addEventListener('submit',(e) => {
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


const logoutButton = document.querySelector('.logout');

  logoutButton?.addEventListener('click', () => {
    signOut(auth).then(() => {
      console.log('user signed out')
      logout()
    }).catch((err)=> {console.log(err.message)})
  }) 



const loginForm = document.querySelector('#login-form')

loginForm?.addEventListener('submit', (e) => {
e.preventDefault()
const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

signInWithEmailAndPassword(auth, email, password).then(()=>{
  console.log('logged in')
  redirectToDashboard();
}).catch((err)=>{
  console.log(err.message)
})
})

// Define userId globally
let userId;

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    userId = user.uid;

    // Load watchlist on page load
    loadWatchlist(userId);

    // Event listener for the track button
    trackButton?.addEventListener("click", () => {
      const symbol = stockSymbolInput.value.toUpperCase();
      fetchStockData(symbol);
    });

    // Event listener for adding to watchlist
    document.getElementById("addToWatchlistButton")?.addEventListener("click", () => {
      addToWatchlist(userId);
    });
  } else {
  console.log('you arent logged in')  
  }
});

// Function to add stocks to the watchlist
function addToWatchlist(userId) {
  const newSymbol = newStockInput.value.toUpperCase();

  if (!watchlistArray.includes(newSymbol)) {
    watchlistArray.push(newSymbol);

    // Update the UI
    const listItem = document.createElement("li");
    listItem.textContent = newSymbol;
    watchlist.appendChild(listItem);

    // Update Firestore with the new watchlist
    updateFirebaseWatchlist(userId, watchlistArray);
  }

  newStockInput.value = "";
}

// Function to update watchlist in Firestore
async function updateFirebaseWatchlist(userId, watchlist) {
  const userRef = doc(db, 'users', userId);

  // Update the watchlist data in Firestore
  await setDoc(userRef, { watchlist: watchlist });
}

// Function to load watchlist from Firestore
async function loadWatchlist(userId) {
  const userRef = doc(db, 'users', userId);

  // Retrieve the watchlist data from Firestore
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    const data = userDoc.data();
    if (data.watchlist) {
      watchlistArray = data.watchlist;

      // Update the UI with the existing watchlist
      watchlistArray.forEach((symbol) => {
        const listItem = document.createElement("li");
        listItem.textContent = symbol;
        watchlist.appendChild(listItem);
      });
    }
  }
}

// Event listener for adding to watchlist
document.getElementById("addToWatchlistButton")?.addEventListener("click", () => {
  addToWatchlist(userId);
});

