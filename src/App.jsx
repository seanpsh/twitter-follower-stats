import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null); // Clear any previous errors
    try {
      const response = await fetch(
        'https://st19pzhq00.execute-api.ap-southeast-1.amazonaws.com/default/twitter-follower-stats-API',
        {
          method:"GET",
          mode: "cors"
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
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


