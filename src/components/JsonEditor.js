import React, { Component } from 'react';
import Header from './header';
import JsonBlock from './JsonBlock';

// let json = [
//     {
//         string1: "Row 1"
//     },
//     {
//         object1: {
//             subObject1: {
//                 subSubSubObject1:{
//                     object1String: "This is a String"
//                 }
//             }
//         }
//     },
//     {
//         array1: [
//             "item1", 21, "item2"
//         ]
//     }
// ]

let json = [
    {
        id:1,
        name: "string1",
        type: "string",
        value: "foo"
    },
    {
        id:11,
        name: "object1",
        type: "object",
        value: [
            {
                id:111,
                name: "object1Sub1",
                type: "object",
                value: [
                    {
                        id:1111,
                        name: "object1Sub1Sub1",
                        type: "object",
                        value: [
                            {
                                id:11111,
                                name: "Object1 nested string",
                                type: "string",
                                value: "bar"
                            }
                        ]
                    }
                ] 
            }
        ]
    },
    {
        id:12,
        name: "Array",
        type: "array",
        value: [
            {
                id:121,
                name: "array number",
                type: "number",
                value: 1
            },
            {
                id:122,
                name: "array Boolean",
                type: "boolean",
                value: true,
            },
            {
                id:123,
                name: "SubArray",
                type: "array",
                value: [
                    {
                        id:1231,
                        name: "array number",
                        type: "number",
                        value: 17
                    },
                    {
                        id:1232,
                        name: "array Boolean",
                        type: "string",
                        value: "subarray",
                    }
                ]
            }
        ]
    }
]


class JsonEditor extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            type: '',
            value:'',
            json,
            insertItem: true
        }
    }

    recursiveLog = (json) => {
        // test recusivity here
        // console.log(json);
        json.forEach(item => {
            if(item.type === "array" || item.type === "object"){
                this.recursiveLog(item.value);
            } 
            
            if(item.type === "string" || item.type === "boolean" || item.type === "number") {
                console.log(item.value)
            }
        })
    }
    componentDidMount = () => {
        console.log("mounted");
        // let json = this.state.json;
        // this.recursiveLog(json);
    }
    handleItemChange = (e) => {
        console.log("We handle input change here");
        console.log(e.target.value);
    }


    // Delete Item from Json
    deleteItem = (id) => {
        // Get the state and pass it to filter function
        let json = this.state.json;
        // filter function that calls itself recursively if the item is an array or object
        let filter = (id, array) => {
            return array.filter(item => {
                if(item.id !== id && (item.type === "array" || item.type === "object")){
                // The recursive call here with the subarray/subobject as argument
                    return item.value = filter(id, item.value);
                }
                return item.id !== id;
            })
        }
        // get the filtered json the item deleted to newJson 
        let newJson = filter(id, json);
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

                            />
                        })
                        : <JsonBlock />
        // OnAdd set the new jsonItem to this.state.json and update feed component with data
        // Delete Items using filter methode
        // Manage recursion on Child enlements

        return (
            <div className="json-editor">
                {/* <button onClick={() => this.updateinsertItem()} className="waves-light btn-large">Add Item</button> */}
                <Header />
                {/* <JsonBlock /> */}
                {/* {this.insertItem()} */}
                {ItemsTable}
            </div>
        );
    }
}

export default JsonEditor;
