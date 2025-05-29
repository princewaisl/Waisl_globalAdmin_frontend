import React, { useState, useEffect } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useNavigate } from "react-router-dom";
import Modal from "../Tickets/Modal";
import Form from "../Tickets/Form";
import userService from "../../auth/userService";

// import userCreateTicket from '/src/service/userCreateTicket.jsx'

function UserDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await userService.gettickets();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  // CREATE A FUNCTION TO GET ROW DATA DYNAMICALLY

  // const rows = userCreateTicket() || [];

  // MODAL TO OPEN CREATE NEW TICKET
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // FORM TO OPEN A FORM TO DISPLAY ROW DATA
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  // PAGINATION LOGIC

  const rowsPerPage = 10;
  const totalPages = Math.ceil(tickets.length / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current page's data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tickets.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <main className="w-full px-2 flex flex-col min-h-screen bg-gray-100 pt-2 dark:bg-gray-600">
        {/* Section Content */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-2 dark:bg-gray-600">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-1 bg-white dark:bg-gray-900">
              <div>
                <h2 className="text-xl font-semibold mb-1 ml-4 dark:text-white">
                  Recent Activity
                </h2>
              </div>
              <div className="grid justify-items-center items-center">
                <div className="grid justify-items-center items-center">
                  <button
                    onClick={openModal}
                    className="mt-2 flex items-center justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 mr-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Create New
                  </button>
                  <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
                </div>
              </div>
            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="..."
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                     <th scope="col" class="px-6 py-3">
                  Ticket No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Comments
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Attachment
                  </th>
                  {/* <th scope="col" class="px-6 py-3">
                    Category Type
                  </th> */}
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((row, index) => (
                  <tr
                    onClick={() => {
                      handleRowClick(row);
                      openForm();
                    }}
                    key={row.id}
                    className={`border-b ${ row.status === "Approved" ? "bg-green-100 hover:bg-green-150" : row.status === "Pending" ? " bg-orange-100 hover:bg-orange-150" : "bg-red-100 hover:bg-red-150" } dark:border-gray-700 border-gray-200`}>
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${index}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                 

                 <td
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                        >
                            <img
                            className="w-10 h-10 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                            alt={`${row.name} image`}
                            />
                            <div className="ps-3">
                            <div className="text-base font-semibold">  {row.created_by}- <span className="text-xs text-gray-800">{row.emp_id}</span></div>
                            <div className="font-normal text-gray-800">prince.patel@waisl.in</div>
                            </div>
                        </td>

                   
                       <td lassName="px-6 py-4 font-normal text-gray-900"></td>
                    <td className="px-6 py-4 font-normal text-gray-900">
                      {row.category}
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900">
                      {row.additional_data?.note || "—"}
                    </td>
                    <td className="px-6 py-4 font-normal text-gray-900">
                      {row.description}
                    </td>

                    <td className="px-6 py-4 flex justify-center items-center font-normal text-gray-900">
                      {row.attachment?.fileUrl ? (
                        <a
                          href={row.attachment.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={row.attachment.fileUrl}
                            alt="attachment"
                            className="h-7 rounded"
                          />
                        </a>
                      ) : (
                        "No Attachment"
                      )}
                    </td>

                    {/* <td className="px-6 py-4 justify-center items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">
                        {row.categoryType || "—"}
                      </span>
                    </td> */}

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-sm ${
                          row.status === true
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.status === true ? "Approved" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION LOGIC */}

            <nav
              aria-label="Page navigation"
              className="flex items-center justify-center mt-4 mb-4"
            >
              <ul className="flex items-center -space-x-px h-8 text-sm">
                <li>
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 border-gray-300 rounded-s-lg 
                        ${
                          currentPage === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100"
                        } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 6 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <button
                        onClick={() => goToPage(page)}
                        className={`px-3 h-8 border border-gray-300 
                          ${
                            page === currentPage
                              ? "text-blue-600 bg-blue-50 border-blue-300"
                              : "text-gray-500 bg-white hover:bg-gray-100"
                          } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}

                <li>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg 
                        ${
                          currentPage === totalPages
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100"
                        } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 6 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>

            <Form isFormOpen = {isFormOpen} data = {selectedRowData} closeForm = {closeForm}></Form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default UserDashboard;
