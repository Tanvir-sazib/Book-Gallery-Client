import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faThLarge, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import './SideNavBar.css'

const SideNavBar = () => {
    return (

        <div className="side-nav-holder">
            <h2 className='head-logo'><Link className='link' to='/'><FontAwesomeIcon icon={faBookOpen} /> Book Gallery</Link></h2>
            <div className='side-bar text-left d-flex flex-column'>

                <Link className="link" to="/admin/manageBooks"><FontAwesomeIcon icon={faThLarge} />  Manage Books</Link>
                <Link className="link" to="/admin/addBooks"><FontAwesomeIcon icon={faPlus} /> Add Books</Link>
                <Link className="link" to="/admin/editBooks"><FontAwesomeIcon icon={faEdit} /> Edit Books</Link>
            </div>
        </div >



    );
};

export default SideNavBar;