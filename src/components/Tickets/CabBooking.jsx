import React, { useState,useEffect } from 'react';
import userService from '../../auth/userService';

function CabBooking(props) {
    const cablocations = {
      "DEL" : ["T3", "T1", "T2"],
      "GOA" : ["LOC1", "LOC2", "LOC3"],
      "HYD" : ["LOC4", "LOC5", "LOC6"]
    };

    const [time, setTime] = useState('');
    
      const [Locations, setLocations] = useState([]);
    const [selectedDate, setDate] = useState('');
    const [pickuplocation, setPickUp] = useState('');
    const [droplocation, setDrop] = useState('');

    const handleChange = (event) => {
        const id = event.target.id;
        const change = event.target.value;

        switch (id) {
          case "pickuplocation":
            props.setTicketDetails(prev =>({
              ...prev,
                "pickuplocation": change
              }));
          break;
          case "droplocation":
            props.setTicketDetails(prev =>({
              ...prev,
                "droplocation": change
              }));
          break;
          case "time":
            props.setTicketDetails(prev =>({
              ...prev,
                "time": change
              }));
          break;
          case "date":
            props.setTicketDetails(prev =>({
              ...prev,
              "date": change
            }));
          break;     
          default:
            props.setTicketDetails(prev =>({
              ...prev,
            }));
          break;
        }
    };


      useEffect(() => {
        const fetchLocations = async () => {
          const data = await userService.getLocations();
          setLocations(data);
       
          console.log("data",data)
        };
    
        fetchLocations();
      }, []);
    return (
    <>
      <div className="col-span-2 sm:col-span-1 space-y-2">
        <label className="text-l font-semibold dark:text-white">
          Select Pickup Location:<span className="text-red-500">*</span>
        </label>
        <select 
            id="pickuplocation"
            value={pickuplocation}
            onChange={(e) => {setPickUp(e.target.value); handleChange(e)}}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select Location</option>
            {(Locations || []).map((location) => (
              <option key={location.id} value={location.id}>{location.location}</option>
            ))}
        </select>
      </div>

      <div className="col-span-2 sm:col-span-1 space-y-2">
        <label className="text-l font-semibold dark:text-white">
          Select Drop Location:<span className="text-red-500">*</span>
        </label>
        <select 
            id="droplocation"
            value={droplocation}
            onChange={(e) => {setDrop(e.target.value); handleChange(e)}}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select Location</option>
            {(Locations || []).filter((location) => {
              return location !== pickuplocation;
            }).map((location) => (
              <option key={location.id} value={location.id}>{location.location}</option>
            ))}
        </select>
      </div>

      <div className="col-span-2 sm:col-span-1 space-y-2">
        <label className="text-l font-semibold dark:text-white">
          Select Pickup Time:<span className="text-red-500">*</span>
        </label>
        <input 
          id="time" 
          type="time" 
          value={time} 
          onChange={(e) => {setTime(e.target.value); handleChange(e)}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

      <div className="col-span-2 sm:col-span-1 space-y-2">
        <label className="text-l font-semibold dark:text-white">
          Select Date:<span className="text-red-500">*</span>
        </label>
        <input
          id="date"
          type="date"
          value={selectedDate}
          onChange={(e) => {setDate(e.target.value); handleChange(e)}}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
    </>
    );
}

export default CabBooking;