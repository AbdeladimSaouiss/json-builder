import React from 'react';

var JsonItem = ({ item, handleItemChange }) => {
    return (
        <div className="item-row row">
            <div className="first-col col s7">
                <input type="text" name="name" id="" placeholder="Enter name" onChange={handleItemChange} defaultValue={item.name && item.name} />
            </div>
            <div className="col s2">
                <select className="browser-default" name="type" id="" onChange={handleItemChange} defaultValue={item.type && item.type}>
                    <option value="string">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="object">Structure</option>
                    <option value="array">Array</option>
                </select>
            </div>
            <div className="col s2">
                {(item.type === "string" || item.type === "boolean" || item.type === "number") ?
                    <input type="text" name="value" id="" placeholder="Enter value" onChange={handleItemChange} defaultValue={item.value} />
                    : ""
                }
            </div>
            <div className="col s1">
                <button>
                    <i className="Medium material-icons">delete_forever</i>
                </button>
            </div>
        </div>

    );
}

export default JsonItem;