import React from 'react';

import SideNavBar from '../SideNavBar/SideNavBar';

const Admin = () => {
    return (
        <div className='row books-container mr-0'>
            <div className="col-3">
                <SideNavBar />
            </div>
            <div className="col-9">
                <h1>Welcome to Admin Panel</h1>
            </div>
        </div>
    );
};

export default Admin;