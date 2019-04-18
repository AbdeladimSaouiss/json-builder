import React from 'react';

var Button = ({ content, addItem }) => {
    return (
        <button className="btn" onClick={addItem}>{content}</button>
    );
}

export default Button;