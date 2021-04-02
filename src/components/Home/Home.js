import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { CartContext } from '../../App';
import BookCard from '../BookCard/BookCard';
import Cart from '../Cart/Cart';
import Navbars from '../NavBar/Navbar';
import './Home.css'
const Home = () => {
    // const [productIds, setProductIds] = useState([]);
    const [cartItems, setCartItems] = useContext(CartContext);
    const history = useHistory();
    const [books, setBooks] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        axios.get('https://book-gallery-ts.herokuapp.com/products')
            .then(res => {
                setBooks(res.data)
                setloading(false)
            })


    }, [])

    const handleBuyNow = (data) => {
        axios.get('https://book-gallery-ts.herokuapp.com/checkout/add/' + data)
            .then(response => {
                const newCart = [response.data, ...cartItems];
                setCartItems(newCart);
                history.push('/checkout');
            })


    }

    return (
        <>
            <div>
                <Navbars />
            </div>
            <div>
                <div>
                    <input className='from-control srch-input p-3' type="text" placeholder='Search your desired book here....' name="" id="" />
                    <button className='search-btn'>Search</button>
                </div>
                <div className="container">

                    <div className="row  d-flex justify-content-center">
                        {
                            loading ? <Spinner animation="border" variant="primary" /> : books.map(book => <BookCard book={book} key={book._id} handleBuyNow={handleBuyNow} />)
                        }
                    </div>
                </div>
            </div>



        </>
    );
};

export default Home;