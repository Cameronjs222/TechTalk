
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/logo2-4.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState({
        name: '',
        email: '',
        id: '',
        role: '',
        status: ''
    })

    // function deleteUser() {
    //     axios.delete('http://localhost:5000/api/users/1')
    //         .then(res => {
    //             setUser({
    //                 name: res.data.name,
    //                 email: res.data.email,
    //                 id: res.data.id,
    //                 role: res.data.role,
    //                 status: res.data.status
    //             })
    //         }
    //         )
    //         .catch(err => {
    //             console.log(err)
    //         })
  const[currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
 
 
  console.log(following);
  console.log("^followers^");


  function logOut() {
    axios.post('http://localhost:8000/api/users/logout',{}, { withCredentials: true })
      .then(res => {
        setCurrentUser()
        navigate("/")
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/me',  { withCredentials: true })
      .then(res => {
        setCurrentUser(res.data.user);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);


  useEffect(() => {
    const getUsers = async () => {
      axios.get('http://localhost:8000/api/users', { withCredentials: true })
        .then(res => {
          setUsers(res.data.users);
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

          <a href="/create"><button className='addP'>Add a Post</button></a>
          <a href="/viewPost"><button className='myP'>My Post</button></a>
        </div>

        <div className='userLink'>
          <p>Welcome <b>"{currentUser.name}Mark Jacobs"</b></p>
          <a href="/editUser"><button className='accInfo'>User Info</button></a>  <button onClick={logOut} className='logbutton'>Logout</button>
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

