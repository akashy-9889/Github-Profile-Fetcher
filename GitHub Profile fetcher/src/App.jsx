// import { useState,useCallback } from 'react'

// import './App.css'
  



// function App() {
  
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState({
//     username: {data[name]},
//     position: "Artificial Intelligence Engineer",
//     city: "Gurgoan",
//     imgUrl: '',
//     gitFollowers: 0,
//     Public repository: "",
//     Public gists: " ",
//     crated date : "",
//     last updates date : ""
//   });


 
 
//   const apiFetch = useCallback(()=>{
//     fetch(`https://api.github.com/users/${input}.json`)
//       .the((data) =>{
//         if (!data.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return data.json();
//       })
//       .then((data) =>{
//         username = data.name
//         userId = data.id
//         position = data.location

//          imgUrl = data.avatar_url
//          gitFollowers = data.followers
//         Public repository = data.public_repos,
//          Public gists = data.public_gists
//         setLoading(false)
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);

//   },[button])

//   return (
//         <>
//      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-orange-500'>
//       <h1 className='text-white text-center'>Github</h1>

//       <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//         <input
//           type='text'
//           value = {input}
         
//           className='outline-none w-full py-1 px-3'
//           placeholder='Get Your Password'
//           onChange={(e) => setUserAge(e.target.value)} />
          
         
       
//         <button
//           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
//           onClick = {apiFetch}>
//           Sumbit
//         </button>
//         {  <h2> Name : {user.name}</h2>
//                  &&      <h2>  UserId: {user.id}</h2> 
//                   &&      <h3> Git Followers: {user.}</h3> 
//                   &&      <h3>  Git Following: {git.}</h3>
//                    &&    <h3> Public repository: {} "",</h3>
//                   &&     <h3> Public gists:{}</h3>
//                    &&    <h3>   crated date : {}</h3>
//                   &&     <h3>   last updates date : {}</h3>
//   }

//         </div>
//         </div>
//         </>
   
//   )
// }

// export default App

import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState(''); // Input field value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('username'); // To choose between username, ID, and URL

  const [data, setData] = useState({
    username: '',
    position: 'Artificial Intelligence Engineer',
    city: 'Gurgaon',
    imgUrl: '',
    gitFollowers: 0,
    publicRepository: 0,
    publicGists: 0,
    createdDate: '',
    lastUpdatedDate: '',
  });

  const apiFetch = useCallback(() => {
    setLoading(true);
    let apiUrl = '';

    // Determine API URL based on search type
    if (searchType === 'username') {
      apiUrl = `https://api.github.com/users/${input}`;
    } else if (searchType === 'id') {
      apiUrl = `https://api.github.com/users/${input}`;
    } else if (searchType === 'url') {
      const usernameFromUrl = input.split('/').pop(); // Extract username from URL
      apiUrl = `https://api.github.com/users/${usernameFromUrl}`;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((userData) => {
        setData({
          username: userData.name || userData.login,
          position: userData.location || 'Unknown',
          imgUrl: userData.avatar_url,
          gitFollowers: userData.followers,
          publicRepository: userData.public_repos,
          publicGists: userData.public_gists,
          createdDate: userData.created_at,
          lastUpdatedDate: userData.updated_at,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [input, searchType]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center">GitHub Profile Fetcher</h1>

      <div className="flex flex-col space-y-4 mb-4">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="outline-none py-2 px-3"
        >
          <option value="username">Username</option>
          <option value="id">ID</option>
          <option value="url">GitHub URL</option>
        </select>

        <input
          type="text"
          value={input}
          className="outline-none w-full py-1 px-3"
          placeholder={`Enter GitHub ${searchType}`}
          onChange={(e) => setInput(e.target.value)} // Update input state
        />

        <button
          className="outline-none bg-blue-700 text-white px-3 py-1"
          onClick={apiFetch}
        >
          Submit
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data.username && (
        <div>
          <h2>Name: {data.username}</h2>
          <h2>Position: {data.position}</h2>
          <img src={data.imgUrl} alt={data.username} width="100" />
          <h3>Git Followers: {data.gitFollowers}</h3>
          <h3>Public Repositories: {data.publicRepository}</h3>
          <h3>Public Gists: {data.publicGists}</h3>
          <h3>Created Date: {new Date(data.createdDate).toLocaleDateString()}</h3>
          <h3>Last Updated: {new Date(data.lastUpdatedDate).toLocaleDateString()}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
