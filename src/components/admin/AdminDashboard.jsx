import React, { useState,useEffect } from 'react';
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import userService from '../../auth/userService';
import Form from '../Tickets/Form';

function AdminDashboard() {



  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // FORM TO OPEN A FORM TO DISPLAY ROW DATA
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };



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
      <div>
        <Header />
        <main className="w-full px-2 flex flex-col min-h-screen bg-gray-100 pt-2 dark:bg-gray-600">
          {/* Section Content */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-2 dark:bg-gray-600">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-1 bg-white dark:bg-gray-900">
                <div>
                  <h2 className="text-xl font-semibold mb-1 ml-4 dark:text-white">
                    Recent Activity
                  </h2>
                </div>
                <label for="table-search" class="sr-only mt-1 mr-1">
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-users"
                    class="block p-2 ps-10 mr-1 mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for users"
                  />
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
                  <th scope="col" class="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                    <th scope="col" class="px-6 py-3">
                    Action
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

                    <td className="px-6 py-4 font-normal text-gray-900">
                      {row.created_by}
                    </td>
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

                    <td className="px-6 py-4 justify-center items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-sm">
                        {row.categoryType || "—"}
                      </span>
                    </td>

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
                    <td className="px-6 py-4"> 
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


              {/* PAGINATION LOGIC */}

              <nav aria-label="Page navigation" className="flex items-center justify-center mt-4 mb-4">
                <ul className="flex items-center -space-x-px h-8 text-sm">
                  <li>
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-e-0 border-gray-300 rounded-s-lg 
                        ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                      </svg>
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => goToPage(page)}
                        className={`px-3 h-8 border border-gray-300 
                          ${page === currentPage 
                            ? 'text-blue-600 bg-blue-50 border-blue-300' 
                            : 'text-gray-500 bg-white hover:bg-gray-100'} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg 
                        ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
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
      </div>
    </>
  );
}

export default AdminDashboard;