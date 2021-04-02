import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import SideNavBar from '../SideNavBar/SideNavBar';

const EditById = () => {
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedBook, setSelectedBook] = useState({});
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        axios.get(`https://book-gallery-ts.herokuapp.com/product/${id}`)
            .then(response => setSelectedBook(response.data))
    })

    const onSubmit = (data, e) => {
        const bookData = {
            name: data.bookName,
            author: data.authorName,
            price: data.price,
            image: imageUrl || selectedBook.image
        }
        if (bookData.name && bookData.price) {
            axios.patch(`https://book-gallery-ts.herokuapp.com/update/${id}`, bookData)
                .then(response => {
                    if (response) {
                        e.target.reset();

                    }
                })
                .catch(error => console.log(error))
        }
    }

    const imageUploadHandler = e => {
        const imageData = new FormData();
        imageData.set('key', '986f96fe4d582cd6cd92358c13d3d645');
        imageData.set('image', e.target.files[0])


        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div className='row books-container d-flex mr-0 flex-wrap'>
            <div className="col-3">
                <SideNavBar />
            </div>

            <div className="col-9">
                <h3 className='text-left mb-4'>Edit Details</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row container from-input text-left">

                        <div className="col-6">

                            <span><strong>Book Name:</strong></span>
                            <input className='form-control w-75 mb-3' defaultValue={selectedBook.name} name="bookName" type='text' placeholder="Book Name" ref={register} />
                            <span><strong>Add Price:</strong></span>
                            <input className='form-control w-75 mb-3' defaultValue={selectedBook.price} name="price" type='text' placeholder="Price" ref={register} />

                        </div>
                        <div className="col-6">
                            <span><strong>Author Name:</strong></span>
                            <input className='form-control w-75 mb-3' defaultValue={selectedBook.author} name="authorName" type='text' placeholder="Author name" ref={register} />
                            <span><strong>Add Image:</strong></span>
                            <input className='form-control w-75 mb-3 p-1' onChange={imageUploadHandler} name="image" type='file' placeholder="test" ref={register} />
                            <div className=" d-flex justify-content-end">
                                <input className='submit-btn mr-5' type="submit" />
                            </div>
                        </div>
                    </div>


                </form>
            </div>

        </div>
    );
};

export default EditById;