import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [followers, setFollowers] = useState([]);
  // console.log(users);
  // console.log("^users^");
  // console.log(currentUser);
  // console.log("^currentUser^");
  console.log(followers);
  console.log("^followers^");
  
  useEffect(() => {
    const getUsers = async () => {
    axios.get('http://localhost:8000/api/users') 
      .then(res => {
        setUsers(res.data.users);
        setCurrentUser(res.data.users[4]);
      })
      .catch(err => {
        console.log(err);
      })};
    getUsers();
  }, []);

  useEffect(() => {
    const getFollowers = async () => {
      if (currentUser._id === undefined) return;
      try {
        let followersList = currentUser.followers;
        console.log(followersList);
        console.log("^followersList^");
  
        const newFollowers = []; // Create a new array to hold the updated followers
  
        for (let i = 0; i < followersList.length; i++) {
          const follower = followersList[i];
          const res = await axios.get(`http://localhost:8000/api/users/${follower}`);
          newFollowers.push(res.data.user); // Push the new follower to the array
        }
  
        setFollowers(newFollowers); // Update the followers state after the loop
      } catch (err) {
        console.log(err);
      }
    };
  
    getFollowers();
  }, [currentUser]);

  // const addFollower = () => {
  //   const updatedCurrentUser = { ...currentUser };
  //   updatedCurrentUser.followers.push(users[1]);
  //   console.log(updatedCurrentUser);
  
  //   const followersData = updatedCurrentUser.followers.map(follower => ({
  //     userId: follower._id,
  //     userName: follower.name
  //   }));
  
  //   axios.patch(`http://localhost:8000/api/users/${currentUser._id}`, {
  //     followers: followersData
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // };
  

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
      {/* <button onClick={addFollower}>Add followers</button> */}
      <div style={{border: "2px solid black", }}>
        <h2>Followers</h2>
      </div>

      <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: 'column'}}>
        <h2>Community Post</h2>

      <div style={{ border: "2px solid black", 
      backgroundColor: "grey", 
      width: "auto", 
      padding: '0 10%', 
      height: "30vh", 
      overflow: "scroll",
    }}>
        {users.map(user => (
          <Link to={`/user/${user._id}`} key={user._id}>
            <div key={user._id} style={{ border: '1px solid black', display: 'flex', justifyContent: "start", flexDirection: 'column', alignItems: "start", gap: "5px", padding: '10px' }}>
              <span>Today's post by {user.name}, id is {user._id}</span>
              <span>User post: {user.post}</span>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Home;
