
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './BookCard.css'

const BookCard = ({ book, key, handleBuyNow }) => {
    return (
        <div>
            <Card className='m-3 book-card' style={{ width: '21rem' }}>
                <div className="image-div d-flex justify-content-center align-items-center">
                    <Card.Img className='' variant="top" src={book.image} />
                </div>
                <div className="book-card-body">
                    <Card.Body>
                        <div className="text-left card-text-body">
                            <strong>{book.name}</strong>
                            <p>{book.author}</p>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <Card.Text> <strong className='book-price ml-3'>${book.price}</strong> </Card.Text>
                            <div>
                                <button onClick={() => handleBuyNow(book._id)} className='book-btn'>Buy Now</button>
                            </div>
                        </div>
                    </Card.Body>
                </div>

            </Card>
        </div>
    );
};

export default BookCard;