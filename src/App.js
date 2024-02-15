import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('https://randomuser.me/api/?page=1&results=1&seed=abc')
      .then((response) => response.json())
      .then((data) => setUserData(data.results[0]))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleMessageClick = (email) => {
    window.location.href = `mailto:${email}`;
  };
    const handlePhoneClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-700">
      {userData && (
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                className="w-16 h-16 object-cover rounded-full border-2 border-blue-500"
                src={userData.picture.large}
                alt="User"
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {`${userData.name.title} ${userData.name.first} ${userData.name.last}`}
                </h2>
                <p className="text-gray-600 font-semibold text-blue-500">{userData.email}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => handleMessageClick(userData.email)}
            >
              Message
            </button>
          </div>
          <div className="mt-4">
            <p className="text-gray-800">{`${userData.location.street.number} ${userData.location.street.name}, ${userData.location.city}, ${userData.location.state}, ${userData.location.country} ${userData.location.postcode}`}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">
              {`Date of Birth: ${userData.dob.date}, Age: ${userData.dob.age}`}
            </p>
            <p className="text-gray-600">
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => handlePhoneClick(userData.phone)}
              >
                Phone: {userData.phone}
              </span>
              {', '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => handlePhoneClick(userData.cell)}
              >
                Cell: {userData.cell}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
