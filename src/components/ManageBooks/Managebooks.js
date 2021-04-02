import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import './ManageBook.css'
import { useHistory } from 'react-router';
import { Spinner } from 'react-bootstrap';
import ManageBookcard from '../ManageBookCard/ManageBookcard';

const Managebooks = () => {
    const history = useHistory();
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [removedId, setRemovedId] = useState('')
    useEffect(() => {
        axios.get('https://book-gallery-ts.herokuapp.com/products')
            .then(res => {
                setBooks(res.data)
                books.filter(book => book._id !== removedId)
                setLoading(false);
            })
    }, [removedId, books])
    const removeBookHandler = id => {
        axios.delete(`https://book-gallery-ts.herokuapp.com/products/delete/${id}`)
            .then(response => {

            })

        setRemovedId(id)
    }
    const editHandler = id => {
        history.push(`/admin/editBooks/${id}`);
    }
    return (
        <div>
            <div className='row books-container d-flex mr-0'>
                <div className="col-3">
                    <SideNavBar />
                </div>
                <div className="col-9 text-left">
                    <h3 className='mb-4'>Manage books</h3>
                    <div className="row text-center manage-list-top mt-5 mx-0">
                        <div className="col-3">
                            <strong>
                                Book
                            </strong>
                        </div>
                        <div className="col-3">
                            <strong>
                                Author Name
                            </strong>
                        </div>
                        <div className="col-3">
                            <strong>
                                Price
                            </strong>
                        </div>
                        <div className="col-3">
                            <strong>
                                Action
                            </strong>
                        </div>
                    </div>
                    {
                        loading ? <div className='d-flex justify-content-center align-items-center m-5'><Spinner animation="border" variant="primary" /></div> : books.map(book => <ManageBookcard book={book} removeBookHandler={removeBookHandler} editHandler={editHandler} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Managebooks;