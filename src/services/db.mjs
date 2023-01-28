import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
            apiKey: "AIzaSyD9oy26wC2XocjF_CxAjECA807QlKDpydE",
            authDomain: "riddle-81547.firebaseapp.com",
            projectId: "riddle-81547",
            storageBucket: "riddle-81547.appspot.com",
            messagingSenderId: "385825049434",
            appId: "1:385825049434:web:5911062c7907a291f14163",
            measurementId: "G-16DLPGEBY2"
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}