import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAzo_bQ5bJWNtdtS1eZ-9TWfUutvcqtpPM",
    authDomain: "crown-clothing-db-65ba4.firebaseapp.com",
    projectId: "crown-clothing-db-65ba4",
    storageBucket: "crown-clothing-db-65ba4.appspot.com",
    messagingSenderId: "817066437603",
    appId: "1:817066437603:web:c4d98ec3baa97849dfced6"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }


    return userDocRef;
};