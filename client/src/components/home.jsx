import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/logo2-4.jpg';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [following, setFollowing] = useState([]);
  const [post, setPost] = useState([]);
  // console.log(users);
  // console.log("^users^");
  // console.log(currentUser);
  // console.log("^currentUser^");
  // console.log(following);
  // console.log("^followers^");
  console.log(post);
  console.log("^post^");

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

    const getPost = async () => {
      axios.get('http://localhost:8000/api/post')
        .then(res => {
          setPost(res.data.posts);
        })
        .catch(err => {
          console.log(err);
        })
    }

    getPost();
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

  // const deletePost = (id) => {
  //   axios.delete(`http://localhost:8000/api/post/${id}`)
  //     .then(res => {
  //       console.log(res.data);
  //       setPost(post.filter(post => post._id !== id));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }


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
          <p>Welcome "logged in user's name" </p>
          <a href="/updateuser?">Update Account Info</a> | <a href="/logout?">Logout</a>
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
            {post.map(post => (
              <Link className='postLink' to={`/viewPost/${post._id}`} key={post._id}>
                <div key={post._id} className='singlePost' style={{ border: '1px solid black', display: 'flex', justifyContent: "start", flexDirection: 'column', alignItems: "start", gap: "5px", padding: '10px' }}>
                  <span>Today's post by {post.user_name}: {post.title}</span>
                  <span>{post.content}</span>
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
