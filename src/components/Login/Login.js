import React, { useContext, useState } from 'react';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Navbars from '../NavBar/Navbar';
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const [user, setUser] = useState({
        email: '',
        password: '',
        error: ''
    })

    const handleSubmit = e => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
                // Signed instorage.removeItem(keyName);
                sessionStorage.removeItem('token');
                var user = userCredential.user;
                const { photoURl, displayName, email } = user;
                const signInUser = {
                    name: displayName,
                    email: email,
                    image: photoURl
                }
                setLoggedInUser(signInUser);
                storeToken();
                history.replace(from);
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                const userInfo = { ...user }
                userInfo.error = errorMessage;
                setUser(userInfo);
            });

        e.preventDefault();
    }
    const handleBlur = e => {
        const userInfo = { ...user };
        userInfo[e.target.name] = e.target.value;
        setUser(userInfo);
    }
    const handleGoogleSignIn = e => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                const { photoURl, displayName, email } = user;
                const signInUser = {
                    name: displayName,
                    email: email,
                    image: photoURl
                }
                sessionStorage.removeItem('token');
                setLoggedInUser(signInUser);
                storeToken();
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                const userInfo = { ...user }
                userInfo.error = errorMessage;
                setUser(userInfo);
            });
    }
    const handleFbSignIn = e => {

    }
    const storeToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            sessionStorage.setItem('token', idToken);

            // ...
        }).catch(function (error) {
            // Handle error
        });
    }

    return (
        <div>
            <div>
                <Navbars />
                <div className="line"></div>
                <div className="login-body mt-5 d-flex justify-content-center align-items-center">
                    <div className="login-card text-left" style={{ width: '23rem' }}>
                        <div className="login-item p-4">
                            <form onSubmit={handleSubmit}>
                                <h3>Sign In</h3>

                                <div className="form-group">
                                    <label>Email address</label>
                                    <input name='email' onBlur={handleBlur} type="email" className="form-control" placeholder="Enter email" />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input onBlur={handleBlur} name='password' type="password" className="form-control" placeholder="Enter password" />
                                </div>


                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                                <p className="forgot-password text-right">
                                    New? <Link to="/signup">Create an account</Link>
                                </p>

                                <p><small className='text-danger'>{user.error}</small></p>
                                <p className='text-center'>or</p>
                                <div className="another-sign-in d-flex justify-content-center">
                                    <button onClick={handleGoogleSignIn} className='social-sign-in m-1'><span className='icon'><FontAwesomeIcon icon={faGoogle} /></span> Continue with Google</button>

                                    {/* <button onClick={handleFbSignIn} className='btn btn-info m-1'><FontAwesomeIcon icon={faFacebookF} /> Facebook</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;