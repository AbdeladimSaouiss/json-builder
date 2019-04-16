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
        name: "string1",
        type: "string",
        value: "foo"
    },
    {
        name: "object1",
        type: "object",
        value: [
            {
                name: "object1Sub1",
                type: "object",
                value: [
                    {
                        name: "object1Sub1Sub1",
                        type: "object",
                        value: [
                            {
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
        name: "Array",
        type: "array",
        value: [
            {
                name: "array number",
                type: "number",
                value: 1
            },
            {
                name: "array Boolean",
                type: "boolean",
                value: true,
            },
            {
                name: "SubArray",
                type: "array",
                value: [
                    {
                        name: "array number",
                        type: "number",
                        value: 17
                    },
                    {
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

   
    render() {
        // If this.state.json is empty => show A jsonblock coponent
        // Else Show this.state.json
        let ItemsTable = (this.state.json.length !== 0)
                        ? this.state.json.map((item, index) => {
                            return <JsonBlock 
                                key={index} 
                                item={item}
                                handleItemChange={this.handleItemChange}
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
