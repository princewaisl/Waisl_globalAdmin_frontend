import React, { useState ,useEffect} from "react";
// import Settings from "../Settings";
import { decodeToken } from "../../auth/tokenUtils";
function Header() {
  const  [tokenuserData, settokenuserData]=useState('')
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const loginstatus = sessionStorage.getItem('loginstatus');

  function setLogout(){
    sessionStorage.setItem('loginstatus', false);
  }

  function closeSettings(){
    setSettingsOpen(false);
  }

 useEffect(() => {
    const decoded = decodeToken();
    if (decoded && decoded.emp_id) {
      settokenuserData(decoded.emp_id);
    }
  }, []);

  return (
    <>
      <div>
        <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="w-full mx-auto px-4 py-1 flex items-center justify-between">
            <div className="flex justify-start items-center">
              {/* Logo */}
              <a href={(loginstatus && "/admindashboard") || "/"} className="flex items-center space-x-2 mr-[100px]">
                <img
                  src="public\\W-icon.png"
                  className="h-8 rounded-full"
                  alt="Logo"
                />
                <span className="text-2xl font-bold dark:text-white p-1.5">
                Admin Portal
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Profile Section */}
            <div className="flex items-center ml-4"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
              <div className="relative">
                <button
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 mr-5"
                >
                  <img
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="User"
                  />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 dark:bg-gray-800 z-50">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                      onClick={() => setSettingsOpen(!settingsOpen)}
                    >
                      Settings
                    </a>
                    <a
                      href="/"
                      onClick={setLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
              <div className="mr-1">
                <div className="font-bold text-gray-700 dark:text-white">{tokenuserData}</div>
           
              </div>
            </div>

          </div>
        </nav>
      </div>

      {/* <Settings settingsOpen = {settingsOpen} closeSettings = {closeSettings}/> */}
    </>
  );
}

export default Header;