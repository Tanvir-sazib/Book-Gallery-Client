import './Orders.css'

import React, { useContext, useEffect, useState } from 'react';
import Navbars from '../NavBar/Navbar';
import axios from 'axios';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';
import { Spinner } from 'react-bootstrap';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setloading] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.get('https://book-gallery-ts.herokuapp.com/orders?email=' + loggedInUser.email, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`,

            }
        })
            .then(response => {
                setOrders(response.data);
                setloading(false);
            })
    }, [loggedInUser.email])
    const orderDetailsHandler = orderId => {
        history.push(`/orders/details/${orderId}`)
    }

    return (
        <div>
            <Navbars />
            <div className="container">
                <h3 className="text-left mt-5"><strong>Order History</strong></h3>

                <div className="order-item-holder mt-5">
                    <div className="row bg-light rounded p-2">
                        <div className="col-3">
                            <h4>
                                <strong>
                                    Name
                                </strong>

                            </h4>
                        </div>
                        <div className="col-3">
                            <h4>
                                <strong>
                                    Date
                                    </strong>

                            </h4>
                        </div>
                        <div className="col-3">
                            <h4>
                                <strong>
                                    Total Price
                                    </strong>

                            </h4>
                        </div>
                        <div className="col-3">
                            <h4>
                                <strong>
                                    Action
                                    </strong>

                            </h4>
                        </div>
                    </div>
                    <div className="order-items ">
                        {
                            loading ? <div className='d-flex justify-content-center align-items-center m-5'><Spinner animation="border" variant="primary" /></div> : orders.map(order => {
                                return (
                                    <div className="row">
                                        <div className="col-3">
                                            <h5>
                                                {order.name}
                                            </h5>
                                        </div>
                                        <div className="col-3">
                                            <h5>
                                                {(order.orderDate)}
                                            </h5>
                                        </div>
                                        <div className="col-3">
                                            <h5>
                                                ${order.totalPrice}
                                            </h5>
                                        </div>
                                        <div className="col-3">
                                            <h5>
                                                <button onClick={() => orderDetailsHandler(order._id)} className='details-btn mt-0'>Order Details</button>
                                            </h5>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;