// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
// import { API_KEY, AUTH_DOMAIN, DB_URL, PROJECT_ID, STORAGE_BUCKET, MS_ID, APP_ID} from "./env.txt";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA_y2uNXwQMGK83UzdwDZeJteDryIgf6PU',
	authDomain: 'nativewallet-de9f5.firebaseapp.com',
	databaseURL: 'https://nativewallet-de9f5-default-rtdb.firebaseio.com',
	projectId: 'nativewallet-de9f5',
	storageBucket: 'nativewallet-de9f5.appspot.com',
	messagingSenderId: '442432294851',
	appId: '1:442432294851:web:dca4eb6db8101e44883776'
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const db = firebase.database();
export const rootRef = db.ref();
