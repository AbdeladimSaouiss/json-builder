import React from 'react';

var Header = () => {
    return (
        <div className="header row">
            <div className="col s7">
                <strong>Name</strong>
            </div>
            <div className="col s2">
                <strong>Type</strong>
            </div>
            <div className="col s2">
                <strong>Value</strong>
            </div>
            <div className="col s1">
                <strong>Delete</strong>
            </div>
        </div>
    );
}

export default Header;
