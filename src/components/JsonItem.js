import React from 'react';
import Button from './Button';

var JsonItem = ({ item, handleItemChange, deleteItem, addSubItem }) => {
    return (
        <div className="item-row row">
            <div className="first-col col s7">
                <input type="text" name="name" id="" placeholder="Enter name" onChange={(e) => handleItemChange(item.id, e.target.name, e.target.value)} defaultValue={item.name && item.name} />
            </div>
            <div className="col s2">
                <select className="browser-default" name="type" id="" onChange={(e) => handleItemChange(item.id, e.target.name, e.target.value)} defaultValue={item.type && item.type}>
                    <option value="string">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="object">Structure</option>
                    <option value="array">Array</option>
                </select>
            </div>
            <div className="col s2">
                {(item.type === "string" || item.type === "boolean" || item.type === "number") 
                    ? <input 
                        type="text" 
                        name="value" 
                        id="" 
                        placeholder="Enter value" 
                        onChange={(e) => handleItemChange(item.id, e.target.name, e.target.value)} defaultValue={item.value} 
                        />
                    : <Button content="Add" addItem={() => addSubItem(item.id)} />
                }
            </div>
            <div className="col s1">
                <button onClick={() => deleteItem(item.id)}>
                    <i className="Medium material-icons">delete_forever</i>
                </button>
            </div>
        </div>

    );
}

export default JsonItem;