import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbars from '../NavBar/Navbar';
import './OrderDetails.css'

const OrderDetails = () => {
    const [detailsProduct, setDetailsProduct] = useState({})
    const orderedBooks = detailsProduct.products;
    const { id } = useParams();
    console.log(orderedBooks);

    useEffect(() => {
        axios.get(`https://book-gallery-ts.herokuapp.com/orders/details/${id}`)
            .then(response => setDetailsProduct(response.data))
    }, [id])

    const removeOrder = id => {
        axios.delete(`https://book-gallery-ts.herokuapp.com/orders/delete/${id}`)
            .then(response => setDetailsProduct(response.data))
    }

    return (
        <div>
            <Navbars />
            <div className="line"></div>
            <div className="container mt-5">
                <h3 className='text-left'><strong>Order details</strong></h3>
                <div className="details-body mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-9">
                            <div className="row text-left">
                                <div className="col-6">
                                    <h5><strong>Order ID:</strong></h5>
                                    <h5><strong>Ordered By:</strong></h5>
                                    <h5><strong>Date:</strong></h5>
                                    <h5><strong>Total Payable:</strong></h5>
                                </div>
                                <div className="col-6">
                                    <h5>{detailsProduct._id}</h5>
                                    <h5>{detailsProduct.name}</h5>
                                    <h5>{detailsProduct.orderDate}</h5>
                                    <h5>${detailsProduct.totalPrice}</h5>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="d-flex mt-2 cancel-btn justify-content-center">
                        <button onClick={() => removeOrder(detailsProduct._id)} className='btn btn-danger p-2'>Cancel Order</button>
                    </div>
                </div>

                <div className="text-left product-body  mt-4">
                    <h3><strong>Ordered Books:</strong></h3>
                    <div className="products d-flex justify-content-center row">
                        {

                            detailsProduct.products && (detailsProduct.products).map(product => {
                                return (
                                    <div className="product-card d-flex col-lg-3 flex-column align-items-center justify-content-center ">
                                        <img className='card-img' src={product.image} alt="" />
                                        <h5>{product.name}</h5>
                                        <h6>{product.author}</h6>
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

export default OrderDetails;