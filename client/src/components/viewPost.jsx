//Made by Jonathan
//this is the page that displays the individual post and the ability to make a comment on it
import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo2-4.jpg';


const ViewPost = () => {

    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comment, setComment] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/${id}`)
            .then(res => {
                setPost(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/comment")
            .then(res => {
                setComment(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function onChangeHandler(e){
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }


    function submitComment(e){
        e.preventDefault();
        axios.post("http://localhost:8000/api/comment", comment)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <div className='vpMain'>
                <div className='navBar'>
                    <img src={logo} alt='Logo' id='logo2'/>
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
                

                
                <div className='viewCont'>
                    <div className='friendPost'>
                        <div className='fpTitle'><h5>POST TITLE <br />(from database)</h5></div>
                        <div className='fpost'>
                            <p className='postInfo'>Post by: "the post's owner" </p>
                            <p className='postInfo2'>01/01/23 at 12:00 AM(from DB)</p>
                            <p className='iPost'>"this is the post  this is the post this is the post this is the post this is the post  this is the post this is the post  this is the post this is the post this is the post this is the post"</p>
                        </div>
                    </div>
                    <p className='coms'>Comments:</p>
                    <div className='comments'>
                            {/* this is where the comments will be displayed in a potential for loop */}
                        {/*for loop */}
                            <div className='comnts'><p className='icom'>comment text Here! comment text Here! comment text Here! comment text Here! comment text Here! comment text Here! comment text Here! comment text Here!</p></div>
                            <div className='comUser'>
                                Comment by: "comment's owner" <br />
                                09/23/2023 at 1:45 PM
                            </div> <br />
{/* just to see how it looks like when theres more comments */}
                            <div className='comnts'><p className='icom'>ce! comment tntr text Here! comment text Here!</p></div>
                            <div className='comUser'>
                                Comment by: "comment's owner" <br />
                                09/23/2023 at 1:45 PM
                            </div> <br />
                            
        
                        {/*end for loop */}
                    </div>
                    <div >
                        <form action={submitComment}>
                            <div className='form-floating mb-3'>
                                <input type="text" name="content" className="form-control" id='postComment' onChange={onChangeHandler}/>
                                <label htmlFor="content">Comment:</label>
                            </div>
                            <button type='submit' className='btn btn-dark'>Post Comment</button>
                        </form>
                    </div>
                </div>
            </div>
       
    )
}

export default ViewPost;