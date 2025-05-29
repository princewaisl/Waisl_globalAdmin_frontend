import React, { useState } from 'react'

function MeetingRoom(props) {
    const [people, setPeople] = useState(0);
    const [projectorRequirement, setRequirement] = useState('');
    const [time, setTime] = useState('');
    const [selectedDate, setDate] = useState('');

    function handleChange(event){
        const id = event.target.id;
        const change = event.target.value;

        switch (id) {
          case "people":
            props.setTicketDetails(prev =>({
              ...prev,
              "people": change
            }));
          break;
          case "projector":
            props.setTicketDetails(prev =>({
              ...prev,
              "projector": change
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
    }
  return (
    <>
        <div className="col-span-2 sm:col-span-1 space-y-2">
            <label className='block text-l font-semibold dark:text-white'>
                No. of persons:<span className="text-red-500">*</span>
            </label>
            <input 
                id="people" 
                type="number" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                step={1} 
                min={1} 
                value={people} 
                onChange={(e) => {setPeople(e.target.value); handleChange(e)}}
            />
        </div>

        <div className="col-span-2 sm:col-span-1 space-y-2">
            <label className='block text-l font-semibold dark:text-white'>
                Projector required:<span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <input 
                        id="projector" 
                        type="radio" 
                        name="projector" 
                        value="yes" 
                        className="text-primary focus:ring-primary"
                        checked={projectorRequirement === "yes"}
                        onChange={(e) => {setRequirement(e.target.value); handleChange(e)}}
                    />
                    <span className='text-l dark:text-white'>Yes</span>
                </div>
                <div className="flex items-center space-x-2">
                    <input 
                        id="projector" 
                        type="radio" 
                        name="projector" 
                        value="no" 
                        className="text-primary focus:ring-primary"
                        checked={projectorRequirement === "no"}
                        onChange={(e) => {setRequirement(e.target.value); handleChange(e)}}
                    />
                    <span className='text-l dark:text-white'>No</span>
                </div>
            </div>
        </div>

        <div className='className="col-span-2 sm:col-span-1 space-y-2"'>
            <label className='block text-l font-semibold dark:text-white'>
                Select Meeting Time:<span className="text-red-500">*</span>
            </label>
            <input 
                id="time" 
                type="time" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={time} 
                onChange={(e) => {setTime(e.target.value); handleChange(e)}} 
            />
        </div>

        <div className='className="col-span-2 sm:col-span-1 space-y-2"'>
            <label className='block text-l font-semibold dark:text-white'>
                Select Date:<span className="text-red-500">*</span>
            </label>
            <input
                id="date"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedDate}
                onChange={(e) => {setDate(e.target.value); handleChange(e)}}
            />
        </div>
    </>
  )
}

export default MeetingRoom