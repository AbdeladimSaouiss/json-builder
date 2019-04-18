import React, { Component } from 'react';
// Component 
import Header from './Header';
import JsonBlock from './JsonBlock';
import EmptyBlock from './EmptyBlock';
import Button from './Button';
// Libraries
import ShortUniqueId from 'short-unique-id';

// let json = [
//     {
//         "id": "GXxvTS",
//         "name": "",
//         "type": "string",
//         "value": ""
//     },
//     {
//         "id": "gJDmPO",
//         "name": "",
//         "type": "string",
//         "value": ""
//     }
// ]
// let json = [
//     {
//         id:1,
//         name: "string1",
//         type: "string",
//         value: "foo"
//     },
//     {
//         id:11,
//         name: "object1",
//         type: "object",
//         value: [
//             {
//                 id:111,
//                 name: "object1Sub1",
//                 type: "object",
//                 value: [
//                     {
//                         id:1111,
//                         name: "object1Sub1Sub1",
//                         type: "object",
//                         value: [
//                             {
//                                 id:11111,
//                                 name: "Object1 nested string",
//                                 type: "string",
//                                 value: "bar"
//                             }
//                         ]
//                     }
//                 ] 
//             }
//         ]
//     },
//     // {
//     //     id:12,
//     //     name: "Array",
//     //     type: "array",
//     //     value: [
//     //         {
//     //             id:121,
//     //             name: "array number",
//     //             type: "number",
//     //             value: 1
//     //         },
//     //         {
//     //             id:122,
//     //             name: "array Boolean",
//     //             type: "boolean",
//     //             value: true,
//     //         },
//     //         {
//     //             id:123,
//     //             name: "SubArray",
//     //             type: "array",
//     //             value: [
//     //                 {
//     //                     id:1231,
//     //                     name: "array number",
//     //                     type: "number",
//     //                     value: 17
//     //                 },
//     //                 {
//     //                     id:1232,
//     //                     name: "array Boolean",
//     //                     type: "string",
//     //                     value: "subarray",
//     //                 }
//     //             ]
//     //         }
//     //     ]
//     // }
// ]


class JsonEditor extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            type: '',
            value:'',
            json: [],
            insertItem: true
        }
    }

    componentDidMount = () => {
        console.log("mounted");
        // console.log(localStorage.hasOwnProperty('json'))
        // let testlocalStorage = Array.isArray(localStorage.hasOwnProperty('json'))
        // console.log(testlocalStorage);
        // console.log(typeof localStorage.getItem("json"));
        // console.log(Array(localStorage.getItem("json")));
        if (localStorage.hasOwnProperty('json')) {
            this.setState({
                json: JSON.parse(localStorage.getItem('json'))
            })
        }
    }

    // Add new item
    addItem = () => {
        const uid = new ShortUniqueId();
        let newItem = {
            id: uid.randomUUID(6),
            name: "",
            type: "string",
            value: ""
        }
        let newJson = this.state.json;
        // push this new item to the json
        newJson.push(newItem);
        //Set the localstorage to the newJson
        localStorage.setItem('json', JSON.stringify(newJson));

        // Update the state
        this.setState({
            json: newJson
        });      
    }

    addSubItem = (id) => {
        // Get the current state
        let tempJson = this.state.json; 
        // Add subitem if current item match the id and is an array/object, otherwise recurse to next sublevel
        let addItem = (id, array) => {
            // map the array and add subitem to the Array/Object children
            return array.map(item => {
                if (item.id === id && (item.type === "array" || item.type === "object")){
                    const uid = new ShortUniqueId();
                    let newItem = {
                        id: uid.randomUUID(6),
                        name: "",
                        type: "string",
                        value: ""
                    }
                    item.value.push(newItem);
                    return item
                } 
                if (item.id !== id && (item.type === "array" || item.type === "object")) {
                    // recursion here
                    addItem(id, item.value)
                }
                return item;
            })
        } 
        let newJson = addItem(id, tempJson);
        //Set the localstorage to the newJson
        localStorage.setItem('json', JSON.stringify(newJson));
        // Update the state with new json
        this.setState({
            json: newJson
        })
    }

    // Change item value
    handleItemChange = (id, key, value) => {
        // Get the current state
        let tempJson = this.state.json;
        // find the element by its ID
        let updateItem = (id, key, value, array) => {
            return array.map(item => {
                // if the id match the item Id in the state, update it
                if (item.id === id) {
                    item[key] = value;
                    // If the value is an arry/object, update the value of that item(object) to be an array instead of a string
                    if (value === "array" || value === "object"){
                        item["value"] = []
                    }
                    return item;
                } 
                if (item.id !== id && (item.type === "array" || item.type === "object") && item.value.length !== 0) {
                    // if the element is an array or object and doesn't match the ID, Recurse inside it
                    updateItem(id, key, value, item.value)
                }
                return  item;
            });

         }
        // Update the element
        let newJson = updateItem(id, key, value, tempJson);
        // console.log(newJson);
        //Set the localstorage to the newJson
        localStorage.setItem('json', JSON.stringify(newJson));
        // Update the state with new json
        this.setState({
            json: newJson
        })

    }
    // Delete Item from Json
    deleteItem = (id) => {
        // Get the state and pass it to filter function
        let tempJson = this.state.json;
        // filter function that calls itself recursively if the item is an array or object
        let filter = (id, array) => {
            return array.filter(item => {
                if (item.id !== id && (item.type === "array" || item.type === "object") && item.value.length !== 0){
                // The recursive call here with the subarray/subobject as argument
                    return item.value = filter(id, item.value);
                }
                return item.id !== id;
            })
        }
        // get the filtered json the item deleted to newJson 
        let newJson = filter(id, tempJson);
        //Set the localstorage to the newJson
        localStorage.setItem('json', JSON.stringify(newJson));
        // set the state with the new filtered json
        this.setState({
            json: newJson
        })
    }

   
    render() {
        // If this.state.json is empty => show A jsonblock coponent
        // Else Show this.state.json
        let ItemsTable = (this.state.json.length !== 0)
            ? this.state.json.map((item, index) => {
                return <JsonBlock 
                    key={item.id} 
                    item={item}
                    handleItemChange={this.handleItemChange}
                    deleteItem={this.deleteItem}
                    addSubItem={this.addSubItem}
                />
            })
            : <EmptyBlock />

        return (
            <div className="json-editor">
                <Button content="Add Json Item" addItem={this.addItem} />
                {(this.state.json.length !== 0) && <Header />}
                {ItemsTable}
            </div>
        );
    }
}

export default JsonEditor;
