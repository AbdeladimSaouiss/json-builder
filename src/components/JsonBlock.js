import React from 'react';
import JsonItem from './JsonItem';

var JsonBlock = ({ item, handleItemChange }) => {
    console.log(item.type)
    if(item.type === "array" || item.type === "object"){
        return (
            <div className="item-holder">
                <JsonItem item={item} handleItemChange={handleItemChange} />

                {item.value.map(item => {
                        return <JsonBlock 
                        // key={index} 
                        item={item}
                        handleItemChange={handleItemChange}
                    />
                })}
            </div>
        ) 
    } else {
        return (
              <div className="item-holder">
                <JsonItem item={item} handleItemChange={handleItemChange} />
            </div>
        )
    }
}

export default JsonBlock;