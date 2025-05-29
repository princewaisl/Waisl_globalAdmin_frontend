import React, { useState } from 'react'

function Others(props) {
    const [details, setDetails] = useState(''); 
  return (
    <div className="col-span-2 space-y-2">
        <label
          className="text-l font-semibold dark:text-white">
            Enter Details<span style={{ color: "red" }}>*</span>
        </label>
        <input type='text' 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required
            placeholder='Enter details'
            value={details}
            onChange={(e) => {setDetails(e.target.value); props.setTicketDetails((prev) => ({
            ...prev,
            "others" : e.target.value
        }))}}/>
    </div>
  )
}

export default Others