import React from 'react';
import JsonItem from './JsonItem';

var JsonBlock = ({ item, handleItemChange, deleteItem }) => {
    // console.log(onDelete)
    if(item.type === "array" || item.type === "object"){
        return (
            <div className="item-holder">
                <JsonItem item={item} handleItemChange={handleItemChange} deleteItem={deleteItem} />

                {item.value.map(item => {
                        return <JsonBlock 
                        key={item.id} 
                        item={item}
                        handleItemChange={handleItemChange}
                        deleteItem={deleteItem}
                    />
                })}
            </div>
        ) 
    } else {
        return (
              <div className="item-holder">
                <JsonItem key={item.id} item={item} handleItemChange={handleItemChange} deleteItem={deleteItem} />
            </div>
        )
    }
}

export default JsonBlock;