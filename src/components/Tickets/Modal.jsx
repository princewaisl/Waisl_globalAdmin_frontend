import React, { useState, useEffect } from "react";
import CabBooking from "./CabBooking";
import MeetingRoom from "./MeetingRoom";
import Others from "./Others";
import GatePass from "./GatePass";
import userService from "../../auth/userService";
import { decodeToken } from "../../auth/tokenUtils";

const Modal = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) return null;

  const [empId, setempId] = useState("");
  const [tokenuserData, settokenuserData] = useState("");
  const [categories, setCategories] = useState([]); // full category list
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [location, setLocation] = useState([]);
  const [ticketDetails, setTicketDetails] = useState({});
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      description: description,
      category:
        categories.find((cat) => cat.id.toString() === selectedCategoryId)
          ?.name || "",
      location: location,
      sub_category: selectedSubcategory,
      ticketDetails: ticketDetails,
      additional_data: {
        Comments: '',
      },
      attachment: {
        fileUrl: file ? URL.createObjectURL(file) : "",
      },
      created_by: tokenuserData,
      emp_id: empId,
    };

    try {
      const response = await userService.saveUserTiketData(payload);
      console.log("Ticket created successfully:", response);
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await userService.getcategories();
      setCategories(data);
      console.log("data", data);
    };

    fetchLocations();
  }, []);

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategoryId(catId);
    setSelectedSubcategory("");

    // Find the selected category and set its subcategories
    const categoryObj = categories.find((cat) => cat.id.toString() === catId);
    setSubcategories(categoryObj ? categoryObj.subcategories : []);
  };

  useEffect(() => {
    const decoded = decodeToken();
    if (decoded && decoded.emp_id) {
      settokenuserData(decoded.emp_name);
      setLocation(decoded.location);
      setempId(decoded.emp_id);
    }
  }, []);
  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 backdrop-brightness-40 z-40"></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden">
        <div className="relative p-4 w-full max-w-5xl max-h-full top-20 mx-auto">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Ticket
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Category <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="category"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="subcategory"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sub-Category <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    id="subcategory"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Sub-Category</option>
                    {subcategories.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedSubcategory === "Cab Booking" && (
                  <CabBooking
                    officelocation={location}
                    setTicketDetails={setTicketDetails}
                  />
                )}
                {selectedSubcategory === "Shuttle" && (
                  <CabBooking
                    officelocation={location}
                    setTicketDetails={setTicketDetails}
                  />
                )}
                {selectedSubcategory === "Meeting Room" && (
                  <MeetingRoom
                    officelocation={location}
                    setTicketDetails={setTicketDetails}
                  />
                )}
                {selectedSubcategory === "Other" && (
                  <Others
                    officelocation={location}
                    setTicketDetails={setTicketDetails}
                    className="col-span-2"
                  />
                )}
                {selectedSubcategory === "Gate Pass" && (
                  <GatePass
                    officelocation={location}
                    setTicketDetails={setTicketDetails}
                  />
                )}

                <div className="col-span-2">
                  <label
                    htmlFor="fileUpload"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload File
                  </label>
                  <input
                    type="file"
                    name="fileUpload"
                    id="fileUpload"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                    multiple="true"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter ticket description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {/* <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg> */}
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
