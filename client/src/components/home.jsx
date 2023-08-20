import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/logo2-4.jpg';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Home = ({currentUser, setCurrentUser}) => {
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  console.log(followers);
  console.log("^followers^");
  console.log("currentuser:",currentUser);

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


  // useEffect(() => {
  //   const getUsers = async () => {
  //     axios.get('http://localhost:8000/api/users')
  //       .then(res => {
  //         setUsers(res.data.users);
  //         setCurrentUser(res.data.users[4]);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   };
  //   getUsers();
  // }, []);

  // useEffect(() => {
  //   const getFollowers = async () => {
  //     if (currentUser._id === undefined) return;
  //     try {
  //       let followersList = currentUser.followers;
  //       console.log(followersList);
  //       console.log("^followersList^");

  //       const newFollowers = []; // Create a new array to hold the updated followers

  //       for (let i = 0; i < followersList.length; i++) {
  //         const follower = followersList[i];
  //         const res = await axios.get(`http://localhost:8000/api/users/${follower}`);
  //         newFollowers.push(res.data.user); // Push the new follower to the array
  //       }

  //       setFollowers(newFollowers); // Update the followers state after the loop
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getFollowers();
  // }, [currentUser]);

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
          <h2>Followers</h2>
        </div>

        <div className='allPost'>
          <h2>Community Post</h2>
          {/* {users.map(user => (
            <Link to={`/user/${user._id}`} key={user._id}>
              <div key={user._id} style={{ border: '1px solid black', display: 'flex', justifyContent: "start", flexDirection: 'column', alignItems: "start", gap: "5px", padding: '10px' }}>
                <span>Today's post by {user.name}, id is {user._id}</span>
                <span>User post: {user.post}</span>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
