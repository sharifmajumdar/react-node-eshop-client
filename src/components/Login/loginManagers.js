// This component represents the firebase related tasks
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';

// This function ensure the firebase initialization
export const initializeLoginFramewrok = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    else {
        firebase.app();
    }
}

// This function handle the login form using google account
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const {displayName, photoURL, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            return signedInUser;
        }).catch((error) => {
            //const errorCode = error.code;
            //const errorMessage = error.Message;
            //const errorEmail = error.email;
            //const credential = error.credential;
        });
}

// This function handle the login form using facebook account
export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            //const credential = result.credential;
            //const accessToken = credential.accessToken;
            const user = result.user;
            user.success = true;
            return user;
        }).catch((error) => {
            //const errorCode = error.code;
            //const errorMessage = error.Message;
            //const errorEmail = error.email;
            //onst credential = error.credential;
        });
}

// This function handle the log out action
export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false
        }
        return signedOutUser;
    }).catch(err => {
        alert('Something is wrong', err);
    });
}

// This function works for creating a new account using name, email and password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

//This function represents the regular sign in matter using email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        newUserInfo.isSignedIn = true;
        return newUserInfo;
    })
    .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User name updated');
    }).catch(function(error){
        alert(error);
    });
}