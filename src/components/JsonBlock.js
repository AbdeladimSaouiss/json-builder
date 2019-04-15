import React from 'react';
import JsonItem from './JsonItem';

var JsonBlock = ({ item, handleItemChange }) => {

    return (
        <div className="item-holder">
            <JsonItem item={item} handleItemChange={handleItemChange} />
        </div>
    );
}

export default JsonBlock;