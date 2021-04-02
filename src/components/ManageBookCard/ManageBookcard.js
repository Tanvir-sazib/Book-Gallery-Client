import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ManageBookcard = ({ book, removeBookHandler, editHandler }) => {
    return (
        <div>
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
                        <button onClick={() => editHandler(book._id)} className='btn btn-success m-1'><FontAwesomeIcon icon={faEdit} /></button>
                        <button onClick={() => removeBookHandler(book._id)} className='btn btn-danger m-1'><FontAwesomeIcon icon={faTrash} /></button>
                    </strong>
                </div>
            </div>
        </div>
    );
};

export default ManageBookcard;