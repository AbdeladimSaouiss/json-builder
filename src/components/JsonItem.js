import React from 'react';

var JsonItem = ({ item, handleItemChange }) => {
    console.log(item);
    console.log(handleItemChange);
    return (
        <div className="item-row row">
            <div className="first-col col s7">
                <input type="text" name="name" id="" placeholder="Enter name" onChange={handleItemChange} value={item.name && item.name} />
            </div>
            <div className="col s2">
                <select name="type" id="" onChange={() => console.log("Change fired")} value={item.type && item.type}>
                    <option value="string">Text</option>
                    <option value="boolean">Boolean</option>
                    <option value="number">Number</option>
                    <option value="object">Structure</option>
                    <option value="array">Array</option>
                </select>
            </div>
            <div className="col s2">
                {(item.type === "string" || item.type === "boolean" || item.type === "number") ?
                    <input type="text" name="value" id="" placeholder="Enter value" onChange={handleItemChange} value={item.value} />
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