import React from 'react';
import JsonItem from './JsonItem';

var JsonBlock = ({ item, handleItemChange, deleteItem, addSubItem }) => {
    // console.log(onDelete)
    if((item.type === "array" || item.type === "object") && item.value.length !== 0){
        return (
            <div className="item-holder">
                <JsonItem 
                    item={item} 
                    handleItemChange={handleItemChange} 
                    deleteItem={deleteItem} 
                    addSubItem={addSubItem} />

                {item.value.map(item => {
                    return <JsonBlock 
                        key={item.id} 
                        item={item}
                        handleItemChange={handleItemChange}
                        deleteItem={deleteItem}
                        addSubItem={addSubItem}
                    />
                })}
            </div>
        ) 
    } else {
        return (
              <div className="item-holder">
                <JsonItem 
                key={item.id} 
                item={item} 
                handleItemChange={handleItemChange} 
                deleteItem={deleteItem}
                addSubItem={addSubItem} />
            </div>
        )
    }
}

export default JsonBlock;