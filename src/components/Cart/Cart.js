
import React, { useContext } from 'react';
import { CartContext, UserContext } from '../../App';
import Navbars from '../NavBar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

const Cart = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [cartItems, setCartItems] = useContext(CartContext);
    const total = cartItems.reduce((total, prd) => total + parseInt(prd.price), 0)


    const handlePlaceOrder = e => {
        const todayTime = new Date();
        const date = moment(todayTime).format('DD/MM/YYYY, h:mm:ss a')
        const newOrderInfo = {
            ...loggedInUser,
            products: [...cartItems],
            orderDate: date,
            totalPrice: total
        }
        axios.post('https://book-gallery-ts.herokuapp.com/placeOrder', newOrderInfo)
            .then(res => {

            })

    }


    return (
        <div>
            <Navbars />
            <div className="container mt-5 text-left">
                <h1 className='text-left '>Checkout</h1>
                <div className="row mt-5">
                    <div className="col-6">
                        <h4>
                            Description
                    </h4>
                    </div>
                    <div className="col-3">
                        <h4>
                            Quantity
                    </h4>
                    </div>
                    <div className="col-3">
                        <h4>
                            Price
                    </h4>
                    </div>
                </div>
                <div className="line"></div>
                {
                    cartItems.map(item => {
                        return (
                            <div className="row mt-5 cart-items">
                                <div className="col-6">
                                    <strong>
                                        {item.name}
                                    </strong>
                                </div>
                                <div className="col-3">
                                    <strong>
                                        1
                                    </strong>
                                </div>
                                <div className="col-3">
                                    <strong>
                                        ${item.price}
                                    </strong>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="line mt-3"></div>
                <div className="row mt-3">
                    <div className="col-9">
                        <h4>
                            Total
                    </h4>
                    </div>
                    <div className="col-3">
                        <h4>
                            ${total}
                        </h4>
                    </div>

                </div>
                <div className="check-out-btn d-flex justify-content-end mt-3">
                    <Link to='/orders'><button onClick={handlePlaceOrder}><FontAwesomeIcon icon={faCartPlus} /> Place Order</button></Link>
                </div>
            </div>


        </div>
    );
};

export default Cart;