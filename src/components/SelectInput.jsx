"use client";
import React from "react";
import Select from "react-select"; // Import react-select

const SelectInput = ({ label, options, value, onChange, name, className }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-semibold">{label}</label>}
            <Select
                name={name}
                value={options.find(option => option.value === value)} // Set the selected option
                onChange={(selectedOption) => onChange(selectedOption)} // Handle the change
                options={options}
                className={className} // Custom className
                placeholder="Select an option"
                isClearable // Allow clearing the selection
            />
        </div>
    );
};

export default SelectInput;
