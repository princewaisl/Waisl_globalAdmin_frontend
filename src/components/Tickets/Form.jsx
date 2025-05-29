import React from 'react'
import CabBooking from './CabBooking'
import MeetingRoom from './MeetingRoom'
import Others from './Others';
import GatePass from './GatePass';

function Form({isFormOpen, data, closeForm}) {
  if (!isFormOpen) return null;
  return (
    <>
      {/* {console.log(data)} */}
      <div className="fixed inset-0 backdrop-brightness-40 z-40"></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden">
        <div className="relative p-4 w-full max-w-5xl max-h-full top-20 mx-auto">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ticket Details
              </h3>
              <button
                type="button"
                onClick={closeForm}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category<span style={{ color: "red" }}>*</span></label>
                  <select 
                      id="categoryType"
                      value={data.category} 
                      required
                      readOnly
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="" className='p-1.5'>{data.category}</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Type<span style={{ color: "red" }}>*</span></label>
                    <select
                        id="categoryType"
                        value={data.categoryType}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="" className="p-1.5 w-full appearance-none h-fit rounded-lg border border-stroke bg-transparent text-dark outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:bg-gray-800">
                        {data.categoryType}</option>
                    </select>
                </div>

                {(data.categoryType === "Cab Booking") && <CabBooking officelocation={location} />}
                {(data.categoryType === "Shuttle") && <CabBooking officelocation={location} />}
                {(data.categoryType === "Meeting Room") && <MeetingRoom officelocation={location} />}
                {(data.categoryType === "Other") && <Others officelocation={location} className="col-span-2"/>}
                {(data.categoryType === "Gate Pass") && <GatePass officelocation={location}/>}

                {/* <div className="col-span-2">
                  <label htmlFor="fileUpload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload File</label>
                  <input type="file" name="fileUpload" id="fileUpload" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                </div> */}
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea id="description" rows="2" 
                    value={data.description}
                    readOnly
                    placeholder="Enter ticket description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </textarea>
                </div>
                <div className="col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Comments</label>
                  <textarea id="description" rows="2" 
                    value={data.comments}
                    readOnly
                    placeholder="Enter ticket description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  </textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form