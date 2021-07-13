import firebse from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//configuring the firestrore
const firebaseConfig = {
  apiKey: "AIzaSyAHP2xRTJcjQZLjRKkE3okTwo3y-poM3mE",
  authDomain: "fir-5e7f3.firebaseapp.com",
  projectId: "fir-5e7f3",
  storageBucket: "fir-5e7f3.appspot.com",
  messagingSenderId: "150069585726",
  appId: "1:150069585726:web:929cb82f46c07878d0ee6f",
  measurementId: "G-2ZDBW9RJB7",
};

const firebaseApp = firebse.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebse.auth();

export { auth };
export default db;
