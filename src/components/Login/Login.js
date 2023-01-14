import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { useState, useContext } from 'react';
import { ShopContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, initializeLoginFramewrok, signInWithEmailAndPassword } from './loginManagers';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: 'false',
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });
    initializeLoginFramewrok();
    const [,,, setLoggedInUser] = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from  = location.state?.from?.pathname || '/'; // Reading location state to redirect after login

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const fbSignIn = () => {
        handleFacebookSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

/*     const signOut = () => {
        handleSignOut()
        .then(res => {
            setUser(res);
            setLoggedInUser(res);
            navigate("/", { replace: true });
        })
    } */

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        storeAuthToken();
        redirect && navigate(from, {replace: true});
    }

    // This function works for validating the input data especially for email and password format
    const handleBlur = (e) => {
        let isFormValid = true;
        if (e.target.name === "email") {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            });
        }
        if(!newUser && user.email && user.password){
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
        }
        e.preventDefault();
        }

    const buttonStyle = {
        width: '250px',
        borderRadius: '25px'
    }

    // This function used for encripting data and send it to server for decoding
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
            console.log(error);
          });
    }
    return (
        <div className='container'>
            <div className='card shadow'>
                <div className='card body'>
                    <div className='row'>
                        <div className='col-md-12 d-flex flex-column align-items-center mt-5'>
                            <h1>Login Credential</h1>
                            <hr />
                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                            <label htmlFor="newUser">New User Sign up</label>
                            <form onSubmit={handleSubmit}>
                                {newUser &&
                                    <div className='form-group'>
                                        <label className='mb-1'>Full Name</label>
                                        <input type="text" name='name' className='form-control' onBlur={handleBlur} placeholder='Enter full name' />
                                    </div>
                                }
                                <div className='form-group'>
                                    <label className='mb-1'>Email Address</label>
                                    <input type="text" name='email' className='form-control' onBlur={handleBlur} placeholder='Enter your email' required />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-1'>Password</label>
                                    <input type="password" name='password' className='form-control' onBlur={handleBlur} placeholder='Enter your password' required />
                                </div>
                                <div className='form-group py-3'>
                                    {/* <Link to="/login" onClick={handleSignIn} className='btn btn-primary shadow w-100'>Submit</Link> */}
                                    <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
                                </div>
                            </form>
                            <span>Or</span> 
                            <button style={buttonStyle} onClick={googleSignIn}>
                                <GoogleIcon />Sign In using Google</button> <br />
                            <button style={buttonStyle} onClick={fbSignIn}>
                                <FacebookIcon />Sign In using Facebook</button>

                            <p style={{ color: 'red' }}>{user.error}</p>
                            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;