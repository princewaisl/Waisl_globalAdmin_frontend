import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Authservice from "../auth/authService";
import UserService from "../auth/userService";
// optionally import saveToken if you want to store token: import { saveToken } from "../auth/tokenUtils";

function Register() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);

  const [formData, setFormData] = useState({
    emp_name:"",
    empId: "",
    email: "",
    password: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     emp_id: formData.empId,
  //     email_id: formData.email,
  //     password: formData.password,
  //     role: 1,
  //     location: formData.location,
  //   };

  //   try {
  //     const response = await Authservice.registerUser(payload);
  //     if (response.status === 200 || response.status === 201) {
  //       alert("Registration Successful");
  //     }
  //   } catch (error) {
  //     console.error("Registration Error:", error);
  //     alert("Failed to register. Try again.");
  //   }
  // };

const handleRegister = async (e) => {
  e.preventDefault();

  const payload = {
    emp_name:formData.emp_name,
    emp_id: formData.empId,
    email_id: formData.email,
    password: formData.password,
    role: 1,
    location: formData.location,
  };

  try {
    const response = await Authservice.registerUser(payload);
    console.log("Register Response:", response); // See what's returned

    if (response.status === 200 || response.status === 201) {
      alert(response.data.message || "Registration Successful");
    } else {
      alert("Registration failed with status: " + response.status);
    }
  } catch (error) {
    console.error("Registration Error:", error);
    if (error.response) {
      alert("Error: " + (error.response.data.message || "Something went wrong."));
    } else {
      alert("Network error or server not reachable.");
    }
  }
};


  // Get location

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await UserService.getLocations();
      setLocations(data);
      console.log("data",data)
    };

    fetchLocations();
  }, []);
  return (
    <>
      <section className="loginbg bg-gray-400 dark:bg-gray-900 bg-blend-multiply">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-3xl font-semibold text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="src/assets/logo.svg"
              alt="logo"
            />
            WAISL Admin Portal
          </a>
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold text-gray-900">Register</h1>
              <form className="space-y-4" onSubmit={handleRegister}>
                  <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    name="emp_name"
                    placeholder="emp name"
                    required
                    value={formData.emp_name}
                    onChange={handleChange}
                    // className="input-field"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="empId"
                    placeholder="eg: W001"
                    required
                    value={formData.empId}
                    onChange={handleChange}
                    // className="input-field"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="eg: name@waisl.in"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Location
                  </label>
                  <select
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.location}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-blue-600 hover:underline"
                >
                  Back
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
