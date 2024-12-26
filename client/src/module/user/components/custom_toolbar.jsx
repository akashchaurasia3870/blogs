import React from 'react';

const CustomToolbar = ({ onChange }) => {
    return (
        <div id="toolbar" className="flex flex-wrap mb-4 space-x-4 p-2 bg-gray-200 rounded-lg">
            <select className="ql-font" onChange={onChange}>
                <option value="Roboto" selected>Roboto</option>
                <option value="Georgia">Georgia</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>

            <select className="ql-size" onChange={onChange}>
                <option value="small" selected>Small</option>
                <option value="">Normal</option>
                <option value="large">Large</option>
                <option value="huge">Huge</option>
            </select>

            <select className="ql-header" defaultValue="" onChange={onChange}>
                <option value="1"> selectedHeader 1</option>
                <option value="2">Navbar 2</option>
                <option value="">Normal</option>
            </select>

            <select className="ql-color" onChange={onChange}>
                <option value="#f00" selected>Red</option>
                <option value="#0f0">Green</option>
                <option value="#00f">Blue</option>
                <option value="#000">Black</option>
                <option value="#fff">White</option>
            </select>

            <select className="ql-background" onChange={onChange}>
                <option value="#f0f0f0" selected>Light Gray</option>
                <option value="#ff0">Yellow</option>
                <option value="#0ff">Cyan</option>
                <option value="#f0f">Magenta</option>
            </select>

            <select className="ql-align" onChange={onChange}>
                <option defaultValue=""></option>
                <option value="center" selected>Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
            </select>

            <button className="ql-bold" selected>Bold</button>
            <button className="ql-italic">Italic</button>
            <button className="ql-underline">Underline</button>
            <button className="ql-code-block">Code Block</button>
            <button className="ql-link">Link</button>
            <button className="ql-image">Image</button>
        </div>
    );
};

export default CustomToolbar;
