import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebaseConfig from '../Login/firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import Navbars from '../NavBar/Navbar';
import './SignUp.css'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
const SignUp = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
    })

    const handleSubmit = e => {

        if (user.email && user.password && user.confirmPassword) {
            if (user.password !== user.confirmPassword) {
                const userInfo = { ...user };
                userInfo.error = "Confirm password should match with password fild!"
                setuser(userInfo);
            } else {
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then((userCredential) => {
                        // Signed in 
                        var userInfo = userCredential.user;

                        updateUserName(user.name);
                        history.replace(from);
                    })
                    .catch((error) => {

                        var errorMessage = error.message;
                        const userInfo = { ...user }
                        userInfo.error = errorMessage;
                        setuser(userInfo);
                    });
            }
        }

        e.preventDefault();
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function () {

        }).catch(function (error) {

        });

    }
    const handleBlur = e => {
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPassHasUppercase = /[A-Z]/.test(e.target.value);
            const isPasswordHasNumber = /\d{1}/.test(e.target.value);
            const isPassValid = isPassHasUppercase && isPasswordHasNumber;
            isFormValid = isPassValid;
            if (!isPassValid) {
                const userInfo = { ...user };
                userInfo.error = "Please Enter a valid password with an uppercase letter and a numebr!"
                setuser(userInfo);
            }
        }

        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setuser(newUserInfo);
        }

    }

    return (
        <div>
            <div>
                <Navbars />
                <div className="line"></div>
                <div className="signup-body mt-4 text-left d-flex justify-content-center align-items-center">
                    <div className="signup-card" style={{ width: '23rem' }}>
                        <div className="signup-item p-4">
                            <form onSubmit={handleSubmit}>
                                <h3>Sign Up</h3>

                                <div className="form-group">
                                    <label>Name</label>
                                    <input onBlur={handleBlur} required name='name' type="text" className="form-control" placeholder="First name" />
                                </div>


                                <div className="form-group">
                                    <label>Email address</label>
                                    <input onBlur={handleBlur} required name='email' type="email" className="form-control" placeholder="Enter email" />
                                </div>

                                <div className="form-group">
                                    <label>Password <br /><small className='text-info'>[should contain at least one digit & a upper case]</small></label>
                                    <input onBlur={handleBlur} required name='password' type="password" className="form-control" placeholder="Enter password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input onBlur={handleBlur} required name='confirmPassword' type="password" className="form-control" placeholder="Confirm password" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                <p className="forgot-password text-right">
                                    Already registered <Link to="/login">sign in</Link>
                                </p>
                                <p><small className="text-danger">{user.error}</small></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;