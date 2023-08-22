import React, { useState } from "react";
import "./Sidebar.css"; // You can create your own CSS file for styling

function Sidebar({ selectedType }) {
    console.log(selectedType, "hello world");
    const [cssProperties, setCssProperties] = useState({
        width: "100px",
        height: "50px",
        backgroundColor: "#007bff",
        color: "#ffffff",
        // Add more CSS properties here
    });

    const handleCssChange = (property, value) => {
        setCssProperties((prevProperties) => ({
            ...prevProperties,
            [property]: value,
        }));
    };

    return (
        <div className="sidebar">
            <h2>Edit {selectedType}</h2>
            {true && (
                <div className="element-settings">
                    <label>
                        Width:
                        <input
                            type="text"
                            value={cssProperties.width}
                            onChange={(e) => handleCssChange("width", e.target.value)}
                        />
                    </label>
                    <label>
                        Height:
                        <input
                            type="text"
                            value={cssProperties.height}
                            onChange={(e) => handleCssChange("height", e.target.value)}
                        />
                    </label>
                    <label>
                        Background Color:
                        <input
                            type="color"
                            value={cssProperties.backgroundColor}
                            onChange={(e) =>
                                handleCssChange("backgroundColor", e.target.value)
                            }
                        />
                    </label>
                    <label>
                        Text Color:
                        <input
                            type="color"
                            value={cssProperties.color}
                            onChange={(e) => handleCssChange("color", e.target.value)}
                        />
                    </label>
                    {/* Add more CSS properties and settings here */}
                </div>
            )}
        </div>
    );
}

export default Sidebar;
