import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'
import { CartContext, UserContext } from '../../App';
const Navbars = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className='container'>
            <Navbar className="w-100 nav-holder" expand="lg">
                <Navbar.Brand> <Link to='/'><FontAwesomeIcon icon={faBookOpen} /> Book Gallery</Link> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto link-item d-flex align-items-center">
                        <Link className="link mx-lg-4" to="/">Home</Link>
                        <Link className="link mx-lg-4" to="/orders">Orders</Link>
                        <Link className="link mx-lg-4" to="/admin">Admin</Link>

                        <Link className="link mx-lg-4" to="/checkout"><FontAwesomeIcon icon={faShoppingCart} /> Checkout</Link>
                        <button className='login-btn'>{loggedInUser.name ? loggedInUser.name : <Link to="/login">Login</Link>}</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navbars;

// loggedInUser.name ? loggedInUser.name :