//Made by Jonathan
//this is the page that displays the individual post and the ability to make a comment on it
import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


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
        <div>
            <div style={{border: "solid",borderWidth: "1px",}}>
                <h1>TechTalk</h1>
                <div>
                    <p>Welcome "logged in user's name" </p>
                    <a href="/updateuser?">Update Account Info</a>
                    <a href="/logout?">Logout</a>
                </div>
                <div style={{border: "solid",borderWidth: "1px",}}>
                    <a href="">Add a Post</a>
                    <a href="">View Community Post Board</a>
                    <a href="">"My" posts</a>
                </div>
                <div style={{border: "solid",borderWidth: "1px",}}>
                    <div style={{border: "solid",borderWidth: "1px",}}>
                        <h2>Post by: "the post's owner" 01/01/23 at 12:00 AM(all these values will be pulled from the database)</h2> 
                        <p>this is the post</p>
                    </div>
                    <div style={{border: "solid",borderWidth: "1px",}}>
                        <h3>Comments</h3>
                        {/* this is where the comments will be displayed in a potential for loop */}
                        {/*for loop */}
                        <div>
                            <h4>Comment by: "comment's owner"</h4>
                            <p>comment text</p>
                        </div>
                        {/*end for loop */}
                    </div>
                    <div>
                        <form action={submitComment}>
                            <label htmlFor="content">Comment:</label>
                            <input type="text" name="content" onChange={onChangeHandler}/>
                            <input type="submit" value="Post Comment" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPost;