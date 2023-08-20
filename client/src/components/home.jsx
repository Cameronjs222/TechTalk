import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/logo2-4.jpg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Home = ({currentUser, setCurrentUser}) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [following, setFollowing] = useState([]);
  // console.log(users);
  // console.log("^users^");
  console.log(currentUser);
  console.log("^currentUser^");
  console.log(following);
  console.log("^followers^");
  
  function logOut() {
    axios.post('http://localhost:8000/api/users/logout', { withCredentials: true })
      .then(res => {
        console.log(res)
        navigate("/")
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    const getUsers = async () => {
      axios.get('http://localhost:8000/api/users')
        .then(res => {
          setUsers(res.data.users);
          setCurrentUser(res.data.users[4]);
        })
        .catch(err => {
          console.log(err);
        })
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getFollowingList = async () => {
      if (currentUser._id === undefined) return;
      try {
        let followingList = currentUser.following;
        console.log(followingList);
        console.log("^followingList^");

        const newFollowingList = []; // Create a new array to hold the updated followers

        for (let i = 0; i < followingList.length; i++) {
          const follower = followingList[i];
          const res = await axios.get(`http://localhost:8000/api/users/${follower}`);
          newFollowingList.push(res.data.user); // Push the new follower to the array
        }

        setFollowing(newFollowingList); // Update the followers state after the loop
      } catch (err) {
        console.log(err);
      }
    };

    getFollowingList();
  }, [currentUser]);



  return (
    <div className='mainDivHome'>
      <div className='navBar'>
        <img src={logo} alt='Logo' id='logo2' />
        <div className='navLinks'>

          <a href=""><button className='addP'>Add a Post</button></a>
          <a href=""><button className='allP'>All Posts</button></a>
          <a href=""><button className='myP'>My Post</button></a>

        </div>
        <div className='userLink'>

          <p>Welcome {currentUser.name} </p>
          <a href="/updateuser?">Update Account Info</a> | <button onClick={logOut}>Logout</button>
          

        </div>
      </div>

      <div className='homeMain'>
        {/* <button onClick={addFollower}>Add followers</button> */}
        <div className='hmFollow'>
          <div className='h2follow'><h2>Following</h2></div>
          <div className='listFollow'>
            <ul>
              {!following ? (
                <li>You have not added any followers yet.</li>
              ) : (
                following.map(user => (
                  <Link to={`/user/${user._id}`} key={user._id}>
                    <li key={user._id}>{user.name}</li>
                  </Link>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className='allPost'>

          <div className='comPost'><h2>Community Post</h2></div>
          <div>
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
    </div>
  );
};

export default Home;
