import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import SideNavBar from '../SideNavBar/SideNavBar';

const EditBooks = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.get('https://book-gallery-ts.herokuapp.com/products')
            .then(res => {
                setBooks(res.data)
                setLoading(false);
            })
    }, [books])

    const handleEdit = id => {
        history.push(`/admin/editBooks/${id}`);
    }
    return (
        <div>
            <div className='row books-container d-flex mr-0'>
                <div className="col-3">
                    <SideNavBar />
                </div>
                <div className="col-9 text-left">
                    <h3 className='mb-4'>Edit books</h3>
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
                        loading ? <div className='d-flex justify-content-center align-items-center m-5'><Spinner animation="border" variant="primary" /></div> : books.map(book => {
                            return (
                                <div className="row text-center bg-white manage-list-top m-0">
                                    <div className="col-3">
                                        <strong>
                                            {book.name}
                                        </strong>
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            {book.author}
                                        </strong>
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            ${book.price}
                                        </strong>
                                    </div>
                                    <div className="col-3">
                                        <strong>
                                            <button onClick={() => handleEdit(book._id)} className='btn btn-success m-1'><FontAwesomeIcon icon={faEdit} /></button>

                                        </strong>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default EditBooks;