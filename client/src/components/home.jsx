import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  console.log(users);
  console.log("^users^");
    console.log(currentUser);
    console.log("^currentUser^");
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/users') 
      .then(res => {
        setUsers(res.data.users);
        setCurrentUser(res.data.users[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <button onClick={addFollower}>Add followers</button> */}
      <div style={{ border: "2px solid black", backgroundColor: "grey", width: "auto", padding: '0 10%', marginLeft: '10vw', height: "30vh", overflow: "scroll" }}>
        <h2>Community Post</h2>
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
  );
};

export default Home;
