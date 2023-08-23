import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../img/logo2-4.jpg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const User = () => {

    const [currentUser, setCurrentUser] = useState({});
    const [post, setPost] = useState([]);
    const { userId } = useParams();
    const [user, setUser] = useState({})
    const [following, setFollowing] = useState(false);
    const navigate = useNavigate();

    console.log(userId);
    console.log("^user^");
    console.log(currentUser);
    console.log("^currentUser^");
    // console.log(post);
    // console.log("^post^");



    function logOut() {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res)
                setCurrentUser()
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/me', { withCredentials: true })
            .then(res => {
                console.log(res)
                setCurrentUser(res.data.user);
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then(res => {
                setUser(res.data.user);

                const fetchedPosts = []; // Create an array to hold fetched posts

                // Use Promise.all to fetch all posts concurrently
                const fetchPostPromises = res.data.user.posts.map(postId =>
                    axios.get(`http://localhost:8000/api/post/${postId}`)
                        .then(res => {
                            console.log(res.data.post);
                            fetchedPosts.push(res.data.post);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                );

                // Wait for all fetches to complete before updating state
                Promise.all(fetchPostPromises)
                    .then(() => {
                        setPost(fetchedPosts);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });


        if (currentUser && currentUser.following && currentUser.following.includes(userId)) {
            setFollowing(true);
        }
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.following && currentUser.following.includes(userId)) {
            setFollowing(true);
        }
    }, [currentUser]);

    function followUser() {

        if (currentUser.following.includes(user._id)) return;

        axios.patch(`http://localhost:8000/api/users/${currentUser._id}`, {
            following: [...currentUser.following, user._id]
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate(`/user/${userId}`);
                setCurrentUser({ ...currentUser, following: [...currentUser.following, user._id] });
                axios.patch(`http://localhost:8000/api/users/${userId}`, {
                    followers: [...user.followers, currentUser._id]
                }, { withCredentials: true })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    }
                    )
            })
            .catch(err => {
                console.log(err);
            });
    }

    function unfollowUser() {
        axios.patch(`http://localhost:8000/api/users/${currentUser._id}`, {
            following: currentUser.following.filter(followedId => followedId !== user._id)
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate(`/user/${userId}`);
                setCurrentUser({ ...currentUser, following: currentUser.following.filter(followedId => followedId !== user._id) });
                axios.patch(`http://localhost:8000/api/users/${userId}`, {
                    followers: user.followers.filter(followerId => followerId !== currentUser._id)
                }, { withCredentials: true })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    }
                    )
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <div className='mainDivHome'>
            <div className='navBar'>
                <img src={logo} alt='Logo' id='logo2' />
                <div className='navLinks'>

                    <a href="/create"><button className='addP'>Add a Post</button></a>
                    <a href="/home"><button className='allP'>All Posts</button></a>

                </div>
                <div className='userLink'>
                  
                    <p>Welcome <b>"{currentUser.name}"</b></p>
                    <a href="/editUser"><button className='accInfo'>User Info</button></a>  <button onClick={logOut} className='logbutton'>Logout</button>

                </div>
            </div>

            <div className='homeMain'>

                <div className='allPost'>
                    <div className="comPost">

                        {user._id === currentUser._id
                            ? (<div className='comPost'><h2>My Post</h2></div>)
                            : (<div className='comPost'><h2>{user.name}'s Post</h2></div>)
                        }
                        {user._id !== currentUser._id
                            ? (
                                <div className=''>
                                    {following ? (
                                        <button
                                            onClick={() => {
                                                unfollowUser();
                                                setFollowing(false);
                                            }}
                                            id='unfollowButton'
                                            className='addP'
                                        >
                                            Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                followUser();
                                                setFollowing(true);
                                            }}
                                            id='followButton'
                                            className='addP'
                                        >
                                            Follow
                                        </button>
                                    )}

                                </div>
                            )
                            : (
                                <div className='' style={{ display: 'none' }}>
                                </div>
                            )
                        }
                    </div>
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
}

export default User