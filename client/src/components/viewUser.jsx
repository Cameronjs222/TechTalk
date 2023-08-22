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
    const navigate = useNavigate();

    console.log(user.posts);
    console.log("^user^");
    console.log(post);
    console.log("^post^");



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
                setCurrentUser(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then(res => {
                setUser(res.data.user);
    
                const fetchedPosts = [];
                const post = res.data.user.posts;
                console.log(post);
                console.log('this is post');
                try {
                    post.map(postId => {
                        axios.get(`http://localhost:8000/api/post/${postId}`)
                            .then(res => {
                                console.log(res.data.post);
                                console.log('post');
                                fetchedPosts.push(res.data.post);
                                setPost(fetchedPosts);
                            })
                            .catch(err => {
                                console.log(err)
                                console.log('error')
                            })
                    });
                } catch (err) {
                    console.log(err)
                    console.log('error')
                }
            })
            .catch(err => {
                console.log(err)
                console.log('error')
            });
    
    }, []);


    return (
        <div className='mainDivHome'>
            <div className='navBar'>
                <img src={logo} alt='Logo' id='logo2' />
                <div className='navLinks'>

                    <a href=""><button className='addP'>Add a Post</button></a>
                    <a href=""><button className='allP'>All Posts</button></a>
                    <a href="/viewPost"><button className='myP'>My Post</button></a>

                </div>
                <div className='userLink'>

                    <p>Welcome {currentUser.name} </p>
                    <a href="/updateuser?">Update Account Info</a> | <button onClick={logOut}>Logout</button>


                </div>
            </div>

            <div className='homeMain'>        

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
}

export default User