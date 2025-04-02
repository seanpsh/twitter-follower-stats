import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from "react";
import { get } from 'aws-amplify/api';

function App() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors
    try {
      const restOperation = get({ 
        apiName: 'twitter-follower-stats-API-API',
        path: '/default' 
      });
      const data = await restOperation.response;

      // const apiName = "twitter-follower-stats-API-API"; // Replace with your actual API name configured in Amplify
      // const path = "/default"; // Adjust path as needed
      // const init = {
      //   headers: {}, // IAM Auth is handled automatically by Amplify
      // };

      // const data = await API.get(apiName, path, init);
      setUsers(data); // Update state with fetched data
    } catch (error) {
      setError(error.message); // Set error state if there's an error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="App">
      <h1>User Followers & Followees</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch User Data'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length > 0 && (
        <div>
          {users.map((user) => (
            <div key={user.user_id}>
              <p>UserID{user.user_id} has {user.followers} Number_of_followers</p>
              <p>UserID{user.user_id} has {user.followees} Number_of_followees</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;


