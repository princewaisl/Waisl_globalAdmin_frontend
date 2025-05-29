import React, { useState } from 'react'

function GatePass(props) {
    const officeLocations = {
      "DEL" : ["T3", "T1", "T2"],
      "GOA" : ["LOC1", "LOC2", "LOC3"],
      "HYD" : ["LOC4", "LOC5", "LOC6"]
    };

    const [name, setName] = useState('');
    const [officeLocation, setOfficeLocation] = useState('');


    return (
    <>
        <div>
            <label
            className="text-l font-semibold dark:text-white">
                Enter Name of Entree<span style={{ color: "red" }}>*</span>
            </label>
            <input type='text' 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                placeholder='Enter details'
                value={name}
                onChange={(e) => {setName(e.target.value); props.setTicketDetails((prev) => ({
                ...prev,
                "name" : e.target.value
            }))}}/>
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
            <label className="text-l font-semibold dark:text-white">
            Select Office Location:<span className="text-red-500">*</span>
            </label>
            <select 
                id="officeLocation"
                value={officeLocation}
                onChange={(e) => {setOfficeLocation(e.target.value); props.setTicketDetails((prev) => ({
                ...prev,
                "officelocation" : e.target.value
                }))}}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
                <option value="">Select Location</option>
                {(officeLocations[props.officelocation] || officeLocations["DEL"]).map((location) => (
                <option key={location} value={location}>{location}</option>
                ))}
            </select>
        </div>


    </>
  )
}

export default GatePass